// Meal photos stay inside this worker. Only public model files are downloaded.
let classifierPromise;
async function classifier(){
  if(!classifierPromise)classifierPromise=(async()=>{
    postMessage({type:'status',text:'Loading the free recognition engine…'});
    const {pipeline,env}=await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js');
    env.allowLocalModels=false;
    env.backends.onnx.wasm.numThreads=1;
    env.backends.onnx.wasm.proxy=false;
    const pipe=await pipeline('zero-shot-image-classification','Xenova/clip-vit-base-patch32',{
      quantized:true,revision:'6ef1ebc8b0766a7a8d11b146462c99cdf74dd22d',
      progress_callback:p=>{if(p.status==='progress')postMessage({type:'status',text:`Downloading recognition model: ${Math.round(p.progress||0)}% of ${p.file||'file'}`});else if(p.status==='ready')postMessage({type:'status',text:'Recognition model ready. Reading your photo…'})}
    });
    return pipe;
  })().catch(error=>{classifierPromise=null;throw error});
  return classifierPromise;
}
onmessage=async event=>{
  const {photo,candidates,requestId}=event.data;
  try{
    const pipe=await classifier();
    postMessage({type:'status',requestId,text:'Comparing the photo with the food library…'});
    const {RawImage}=await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js');
    const image=await RawImage.fromBlob(photo);
    if(image.width<32||image.height<32)throw new Error('Use a clear food photo at least 32 × 32 pixels.');
    const output=await pipe(image,candidates.map(c=>c.label));
    postMessage({type:'result',requestId,matches:output.slice(0,5).map(o=>({...o,id:candidates.find(c=>c.label===o.label)?.id||null}))});
  }catch(error){postMessage({type:'error',requestId,text:error.message||'The recognition model could not run.'})}
};
