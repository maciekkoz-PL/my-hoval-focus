# Power Apps sources

These files are control paste code, not full screen/app exports. Do not import as a Power Platform solution. See docs/SETUP.md.

- `projects/controls.pa.yaml`: delivered 62-control prototype. Owner reports rendering; layout/scaling requires redesign. Keep invariant formula separators in YAML.
- `projects/OnVisible.pl.fx`: paste into scrProjects.OnVisible in the owner's Polish formula editor. Loads source 1 and tasks.
- `my-sources/controls.pa.yaml`: reconstructed supplied V2 plus the three fixes verified by the owner. Uses source Title exposed as `Titel`. Contains no explicit source URL.

Important local variables: mhpTasks (tasks collection), mhpSource (source record), mhpFilter (All/Done/Recorded/Missing), mhpLoadError. Sources selection uses mhfSelectedSource and mhfgalSources.

Remaining tenant work: obtain exact current app export, validate errors and interactions, confirm StartScreen, navigation, publishing and data row limit. Do not accidentally reintroduce `mhffrmSource.Item` in button formulas.
