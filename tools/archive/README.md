# Archived generator

build_projects.py is the generator that produced the delivered Projects controls. It writes a local `deliverables/` directory relative to the working directory and requires PyYAML. The authoritative installed/paste sources are under powerapps/; do not overwrite a live app by rerunning this generator. It contains no raw workbook fixture. Raster preview tools and original previews are omitted because they depended on actual workbook contents and environment-specific fonts; the UI source is preserved.
