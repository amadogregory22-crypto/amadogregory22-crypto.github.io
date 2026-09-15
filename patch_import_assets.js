const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf-8');

const newImportAnyAssets = `function importAnyAssets(files){
  if (!files || !files.length) return;
  
  const uploadProgress = document.getElementById("libraryUploadProgress");
  const uploadBar = document.getElementById("libraryUploadBar");
  const uploadCount = document.getElementById("libraryUploadCount");
  
  if (uploadProgress) {
    uploadProgress.classList.remove("hidden");
    uploadBar.style.width = "0%";
    uploadCount.innerText = "0/" + files.length;
  }
  
  let processed = 0;
  let hasChanges = false;
  
  function updateProgress() {
    processed++;
    if (uploadProgress) {
      const percentage = (processed / files.length) * 100;
      uploadBar.style.width = percentage + "%";
      uploadCount.innerText = processed + "/" + files.length;
      if (processed === files.length) {
        setTimeout(() => {
          uploadProgress.classList.add("hidden");
          toast(processed + " fichiers importés avec succès");
          if (hasChanges) {
             apply(() => {
                // Just to trigger reactivity
             });
          }
        }, 1000);
      }
    }
  }

  files.forEach(file=>{
    if(file.name.toLowerCase().endsWith(".json")) {
      importLibraryJson(file);
      updateProgress();
      return;
    }
    readImage(file,async (src,f)=>{
      const tags=await autoTagAssetWithAI(f,src);
      // We don't call apply for every single file to avoid UI freezes
      state.assets.unshift({
        id: 'asset_' + Date.now() + '_' + Math.floor(Math.random() * 1000), 
        name:f.name,
        role:"asset",
        src,
        tags:["import",...tags]
      });
      hasChanges = true;
      updateProgress();
    });
  });
  toast("Assets en cours d'analyse et d'importation...");
}`;

content = content.replace(/function importAnyAssets\(files\)\{[\s\S]*?toast\("Assets en cours d'analyse et d'importation\.\.\."\);\n\}/, newImportAnyAssets);

fs.writeFileSync('app.js', content);
