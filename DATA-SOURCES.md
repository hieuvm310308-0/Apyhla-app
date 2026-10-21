# Apyhla data sources and attribution

## Built-in food reference

`dist/food-data.js` contains 167 authored, editable reference estimates per stated serving. These are not HPB laboratory measurements or a verified clinical food-composition database. Stall recipes, portions, sugars, oils and sauces vary. Users should check food labels or obtain dietitian guidance.

The authored contents of this reference dataset are dedicated to the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). This applies to that dataset, not to third-party libraries, model weights or separately fetched product data.

## Open Food Facts

Online packaged-food lookups use [Open Food Facts](https://world.openfoodfacts.org/), a community-maintained database available under [ODbL](https://opendatacommons.org/licenses/odbl/1-0/).

- [API documentation](https://openfoodfacts.github.io/openfoodfacts-server/api/)
- [Terms of use](https://world.openfoodfacts.org/terms-of-use)

No Open Food Facts database is bundled with the app. Visitors fetch product data on demand and retain selected records locally. Product records and CSV/JSON exports preserve their source and product URL. Reuse or redistribution of Open Food Facts-derived databases must comply with ODbL, including applicable attribution/share-alike requirements. The app does not fetch product images. Full-text searches use the legacy search endpoint; barcode lookups use API v2.

## On-device vision

- [Transformers.js 2.17.2](https://github.com/huggingface/transformers.js/tree/2.17.2), Apache-2.0.
- [Xenova CLIP model card](https://huggingface.co/Xenova/clip-vit-base-patch32).
- [Original CLIP model and limitations](https://huggingface.co/openai/clip-vit-base-patch32).
- [CLIP source and MIT licence](https://github.com/openai/CLIP).

The worker downloads these assets from jsDelivr/Hugging Face when the visitor requests recognition. Photos are processed locally. A visual match is not a nutrition measurement or a calibrated clinical confidence score.

## Educational and workflow references

- [Cronometer Basic](https://cronometer.com/features/free-nutrition-tracking-app.html)
- [Tidepool](https://www.tidepool.org/data-platform)
- [HealthHub carbohydrate education](https://www.healthhub.sg/programmes/diabetes-hub/understanding-carbohydrates)
- [HealthHub hawker food guidance](https://www.healthhub.sg/well-being-and-lifestyle/food-diet-and-nutrition/healthy-hawker-eats)

Apyhla is independent and is not endorsed by these organisations.


## Leo companion preparation references

- ADA exercise and Type 1: https://diabetes.org/health-wellness/fitness/exercise-and-type-1
- ADA glucose and exercise: https://diabetes.org/health-wellness/fitness/blood-glucose-and-exercise
- ADA exercise position statement: https://diabetesjournals.org/care/article/39/11/2065/37249/Physical-Activity-Exercise-and-Diabetes-A-Position
- ADA high glucose/ketones: https://diabetes.org/living-with-diabetes/treatment-care/hyperglycemia
- Breakthrough T1D emotional wellbeing: https://www.breakthrought1d.org/news-and-updates/mental-health-and-type-1-diabetes/
- Breakthrough T1D food/nutrition: https://www.breakthrought1d.org/t1d-resources/food-nutrition/

Leo offers guided preparation and supportive scripts. It does not diagnose, prescribe fuel or insulin, or issue clinical exercise clearance.
