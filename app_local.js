
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  try {
    originalSetItem.apply(this, arguments);
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.message.includes('quota')) {
      console.warn('QuotaExceededError caught by patched localStorage.setItem');
      // Only toast for the main state to avoid spam
      if (key === 'signaturePwaV34' || key === 'signaturePwaV34Saved') {
        // toast is already handled where it was manually patched, or we can handle it here
      }
    } else {
      throw e;
    }
  }
};

const $ = id => document.getElementById(id);

const DEFAULT_STATE = {
  documentType: "banner",
  canvas: { width: 1200, height: 400, radius: 24 },
  identity: {
    firstName:"", lastName:"", jobTitle:"", department:"", company:"",
    phone:"", mobile:"", email:"", address:"",
    website:"", linkedin:"", facebook:"", instagram:"", youtube:"", x:"",
    slogan:"", disclaimer:""
  },
  visible: { phone:true, mobile:false, email:true, address:true, website:true, linkedin:true, facebook:true, instagram:true, youtube:false, x:false },
  design: {
    templateId:"dashboard-yellow", layout:"split-curve",
    bgStyle:"softGradient", bg1:"#ecc764", bg2:"#ffe37a",
    fg:"#273540", accent:"#ffffff",
    motif:"outline", motifOpacity:0.35, iconStyle:"solid", customIcons:{}, iconColor:"#273540"
  },
  logo: { src:"", name:"", size:250, opacity:1, shadow:false },
  background: { src:"", name:"", opacity:0.35, fit:"cover", overlay:true },
  blocks: {
    logo:{x:80,y:90,w:320,h:220,visible:true,locked:false,z:10,type:"logo",label:"Logo"},
    text:{x:470,y:68,w:650,h:255,visible:true,locked:false,z:20,type:"text",label:"Texte"},
    socials:{x:470,y:320,w:430,h:50,visible:true,locked:false,z:30,type:"socials",label:"Réseaux"}
  },
  blockOrder:["logo","text","socials"],
  selectedAssetId:"",
  collaborators:[],
  selectedCollaboratorIndex:-1,
  bulkSettings:{requiredFields:true, brandLock:false},
  ux:{simpleMode:false,selectedDocumentIndex:-1},
  documents:[],
  savedThemes:[],
  tools:{selectedCategory:"organize",selectedTool:"merge-pdf",search:"",statusFilter:"all",workflow:[],runs:[],selectedRunId:""},
  signer:{open:true,signatureImage:"",annotations:[],selectedAnnotationId:""},
  pdfEngine:{open:true,rotation:0,watermark:"CONFIDENTIEL",watermarkOpacity:0.18,showPageNumbers:true,includeAnnotations:true,useDocumentAsBackground:true,lastRenderAt:"",finalFormat:"a4-portrait",finalQuality:0.92,lastPdfExportAt:""},
  studio:{format:"signature-email",zoom:0.55,showGrid:true,snap:true,selectedPage:0,selectedObjectId:"",pages:[{id:"page_1",name:"Page 1",w:1200,h:400,bg:"#ffffff",objects:[]}],
    library:{assets:[],templates:[],selectedCategory:"all",selectedPack:"all",search:"",templateCategory:"all",templateFavorite:"all"},
    ai:{prompt:"",lastPlan:null,history:[]}},
  collaboration:{user:"Grégory AMADO",role:"admin",status:"draft",brandLock:true,comments:[],versions:[],activity:[],approvals:[],publishedAt:"",publishedVersionId:""},
  connector:{enabled:true,mode:"direct",provider:"gemini-builtin",endpoint:"/api/gemini",apiKey:"",customHeader:"X-API-Key",textModel:"gemini-1.5-flash",imageModel:"",timeout:30000,capabilities:{text:true,layout:true,design:true,image:false,document:true,translate:false,brand:true,export:false},responseMapping:"",lastRequest:null,lastResponse:null,log:[]},
  ecosystem:{selectedType:"",selectedId:"",apiRegistry:[],apps:[],drives:[],syncQueue:[],log:[],dbReady:false,display:{fullscreen:false,density:"comfortable",panelWidth:240,studioFit:"fit"},pinned:[]},
  backend:{enabled:false,baseUrl:"http://localhost:8787",environment:"local",offlineFallback:true,authMode:"demo",authIssuer:"",authClientId:"",roleSync:true,dbType:"sqlite",storageType:"filesystem",storagePath:"./storage",proxy:{ai:true,drive:true,sharepoint:true,onedrive:true,glpi:true,exchange:true,directory:true,logs:true},deployTarget:"local",health:null,currentUser:null,log:[]},
  businessConnectors:{selectedId:"sharepoint",lastTest:null,log:[],offlineQueue:[]},
  assets: [
    { id: "example-logo-1", name: "Logo Tech", role: "logo", src: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=300&fit=crop", favorite: true, tags: ["logo", "tech", "exemple"] },
    { id: "example-logo-2", name: "Logo Floral", role: "logo", src: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=300&h=300&fit=crop", favorite: false, tags: ["logo", "floral", "exemple"] },
    { id: "example-logo-3", name: "Logo Géométrique", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop", favorite: false, tags: ["logo", "abstrait", "exemple"] },
    { id: "example-logo-4", name: "Logo Océan", role: "logo", src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=300&fit=crop", favorite: false, tags: ["logo", "ocean", "nature", "exemple"] },
    { id: "example-logo-5", name: "Logo Animal", role: "logo", src: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=300&h=300&fit=crop", favorite: false, tags: ["logo", "animal", "exemple"] },
    { id: "example-logo-6", name: "Logo Vintage", role: "logo", src: "https://images.unsplash.com/photo-1549880181-56a44cf4a9a1?w=300&h=300&fit=crop", favorite: true, tags: ["logo", "vintage", "exemple"] },
    { id: "example-logo-7", name: "Logo Lettre A", role: "logo", src: "https://images.unsplash.com/photo-1506452589332-95f708285df6?w=300&h=300&fit=crop", favorite: false, tags: ["logo", "lettre", "exemple"] },
    { id: "example-logo-8", name: "Logo Énergie", role: "logo", src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop", favorite: false, tags: ["logo", "energie", "exemple"] },
    { id: "example-logo-9", name: "Logo Espace", role: "logo", src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop", favorite: false, tags: ["logo", "espace", "exemple"] },
    { id: "example-logo-10", name: "Logo Minimal", role: "logo", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop", favorite: true, tags: ["logo", "minimaliste", "exemple"] },
    
    { id: "example-bg-1", name: "Fond Abstrait", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop", favorite: true, tags: ["background", "abstrait", "exemple"] },
    { id: "example-bg-2", name: "Fond Géométrique", role: "background", src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&h=400&fit=crop", favorite: false, tags: ["background", "géométrique", "exemple"] },
    { id: "example-bg-3", name: "Fond Bureau", role: "background", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop", favorite: false, tags: ["background", "bureau", "exemple"] },
    { id: "example-bg-4", name: "Fond Montagne", role: "background", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=400&fit=crop", favorite: true, tags: ["background", "montagne", "nature", "exemple"] },
    { id: "example-bg-5", name: "Fond Océan", role: "background", src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&h=400&fit=crop", favorite: false, tags: ["background", "ocean", "nature", "exemple"] },
    { id: "example-bg-6", name: "Fond Architecture", role: "background", src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop", favorite: false, tags: ["background", "ville", "architecture", "exemple"] },
    { id: "example-bg-7", name: "Fond Ciel Etoilé", role: "background", src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=400&fit=crop", favorite: false, tags: ["background", "espace", "nuit", "exemple"] },
    { id: "example-bg-8", name: "Fond Texture Bois", role: "background", src: "https://images.unsplash.com/photo-1520181512411-9a9143a37c02?w=1200&h=400&fit=crop", favorite: false, tags: ["background", "bois", "texture", "exemple"] },
    { id: "example-bg-9", name: "Fond Dégradé", role: "background", src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop", favorite: true, tags: ["background", "degrade", "couleur", "exemple"] },
    { id: "example-bg-10", name: "Fond Peinture", role: "background", src: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=400&fit=crop", favorite: false, tags: ["background", "art", "peinture", "exemple"] },
    
    { id: "example-motif-1", name: "Motif Lignes", role: "motif", src: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=400&fit=crop", favorite: true, tags: ["motif", "lignes", "exemple"] },
    { id: "example-motif-2", name: "Motif Pois", role: "motif", src: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=400&h=400&fit=crop", favorite: false, tags: ["motif", "pois", "exemple"] },
    { id: "example-motif-3", name: "Motif Triangles", role: "motif", src: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&h=400&fit=crop", favorite: false, tags: ["motif", "géometrie", "exemple"] },
    { id: "example-motif-4", name: "Motif Vagues", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop", favorite: false, tags: ["motif", "vagues", "exemple"] },
    { id: "example-motif-5", name: "Motif Écailles", role: "motif", src: "https://images.unsplash.com/photo-1511216113906-8f56bbce15e8?w=400&h=400&fit=crop", favorite: false, tags: ["motif", "écailles", "exemple"] },
    { id: "example-motif-6", name: "Motif Végétal", role: "motif", src: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400&h=400&fit=crop", favorite: true, tags: ["motif", "nature", "végétal", "exemple"] },
    { id: "example-motif-7", name: "Motif Minimaliste", role: "motif", src: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=400&h=400&fit=crop", favorite: false, tags: ["motif", "minimaliste", "exemple"] },
    { id: "example-motif-8", name: "Motif Marbre", role: "motif", src: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&h=400&fit=crop", favorite: false, tags: ["motif", "marbre", "exemple"] },
    { id: "example-motif-9", name: "Motif Terrazzo", role: "motif", src: "https://images.unsplash.com/photo-1582296720536-23910c2c114f?w=400&h=400&fit=crop", favorite: true, tags: ["motif", "terrazzo", "exemple"] },
    { id: "example-motif-10", name: "Motif Floral", role: "motif", src: "https://images.unsplash.com/photo-1490750967868-88cb4ecb0701?w=400&h=400&fit=crop", favorite: false, tags: ["motif", "floral", "exemple"] },
    
    { id: "example-icon-1", name: "Picto Étoile", role: "icon-star", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: true, tags: ["icon", "etoile", "exemple"] },
    { id: "example-icon-2", name: "Picto Coeur", role: "icon-heart", src: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Heart_coraz%C3%B3n.svg", favorite: false, tags: ["icon", "coeur", "exemple"] },
    { id: "example-icon-3", name: "Picto Check", role: "icon-check", src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Check_green_icon.svg", favorite: true, tags: ["icon", "check", "valider", "exemple"] },
    { id: "example-icon-4", name: "Picto Info", role: "icon-info", src: "https://upload.wikimedia.org/wikipedia/commons/2/28/Information.svg", favorite: false, tags: ["icon", "info", "exemple"] },
    { id: "example-icon-5", name: "Picto Warning", role: "icon-warning", src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Dialog-warning.svg", favorite: false, tags: ["icon", "warning", "alerte", "exemple"] },
    { id: "example-icon-6", name: "Picto User", role: "icon-user", src: "https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg", favorite: true, tags: ["icon", "user", "profil", "exemple"] },
    { id: "example-icon-7", name: "Picto Email", role: "icon-email", src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_Icon.svg", favorite: false, tags: ["icon", "email", "mail", "exemple"] },
    { id: "gen-logo-11", name: "logo 11", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=11", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-12", name: "logo 12", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=12", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-13", name: "logo 13", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=13", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-14", name: "logo 14", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=14", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-15", name: "logo 15", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=15", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-16", name: "logo 16", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=16", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-17", name: "logo 17", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=17", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-18", name: "logo 18", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=18", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-19", name: "logo 19", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=19", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-20", name: "logo 20", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=20", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-21", name: "logo 21", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=21", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-22", name: "logo 22", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=22", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-23", name: "logo 23", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=23", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-24", name: "logo 24", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=24", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-25", name: "logo 25", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=25", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-26", name: "logo 26", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=26", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-27", name: "logo 27", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=27", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-28", name: "logo 28", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=28", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-29", name: "logo 29", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=29", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-30", name: "logo 30", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=30", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-31", name: "logo 31", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=31", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-32", name: "logo 32", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=32", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-33", name: "logo 33", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=33", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-34", name: "logo 34", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=34", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-35", name: "logo 35", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=35", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-36", name: "logo 36", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=36", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-37", name: "logo 37", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=37", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-38", name: "logo 38", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=38", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-39", name: "logo 39", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=39", favorite: false, tags: ["logo","gen"] },
    { id: "gen-logo-40", name: "logo 40", role: "logo", src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=300&h=300&fit=crop&random=40", favorite: false, tags: ["logo","gen"] },
    { id: "gen-bg-11", name: "background 11", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=11", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-12", name: "background 12", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=12", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-13", name: "background 13", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=13", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-14", name: "background 14", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=14", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-15", name: "background 15", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=15", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-16", name: "background 16", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=16", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-17", name: "background 17", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=17", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-18", name: "background 18", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=18", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-19", name: "background 19", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=19", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-20", name: "background 20", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=20", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-21", name: "background 21", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=21", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-22", name: "background 22", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=22", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-23", name: "background 23", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=23", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-24", name: "background 24", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=24", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-25", name: "background 25", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=25", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-26", name: "background 26", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=26", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-27", name: "background 27", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=27", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-28", name: "background 28", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=28", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-29", name: "background 29", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=29", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-30", name: "background 30", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=30", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-31", name: "background 31", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=31", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-32", name: "background 32", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=32", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-33", name: "background 33", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=33", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-34", name: "background 34", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=34", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-35", name: "background 35", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=35", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-36", name: "background 36", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=36", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-37", name: "background 37", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=37", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-38", name: "background 38", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=38", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-39", name: "background 39", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=39", favorite: false, tags: ["background","gen"] },
    { id: "gen-bg-40", name: "background 40", role: "background", src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop&random=40", favorite: false, tags: ["background","gen"] },
    { id: "gen-motif-11", name: "motif 11", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=11", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-12", name: "motif 12", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=12", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-13", name: "motif 13", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=13", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-14", name: "motif 14", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=14", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-15", name: "motif 15", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=15", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-16", name: "motif 16", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=16", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-17", name: "motif 17", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=17", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-18", name: "motif 18", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=18", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-19", name: "motif 19", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=19", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-20", name: "motif 20", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=20", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-21", name: "motif 21", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=21", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-22", name: "motif 22", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=22", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-23", name: "motif 23", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=23", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-24", name: "motif 24", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=24", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-25", name: "motif 25", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=25", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-26", name: "motif 26", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=26", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-27", name: "motif 27", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=27", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-28", name: "motif 28", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=28", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-29", name: "motif 29", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=29", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-30", name: "motif 30", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=30", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-31", name: "motif 31", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=31", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-32", name: "motif 32", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=32", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-33", name: "motif 33", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=33", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-34", name: "motif 34", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=34", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-35", name: "motif 35", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=35", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-36", name: "motif 36", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=36", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-37", name: "motif 37", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=37", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-38", name: "motif 38", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=38", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-39", name: "motif 39", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=39", favorite: false, tags: ["motif","gen"] },
    { id: "gen-motif-40", name: "motif 40", role: "motif", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&h=400&fit=crop&random=40", favorite: false, tags: ["motif","gen"] },
    { id: "gen-icon-8", name: "icon 8", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-9", name: "icon 9", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-10", name: "icon 10", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-11", name: "icon 11", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-12", name: "icon 12", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-13", name: "icon 13", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-14", name: "icon 14", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-15", name: "icon 15", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-16", name: "icon 16", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-17", name: "icon 17", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-18", name: "icon 18", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-19", name: "icon 19", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-20", name: "icon 20", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-21", name: "icon 21", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-22", name: "icon 22", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-23", name: "icon 23", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-24", name: "icon 24", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-25", name: "icon 25", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-26", name: "icon 26", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-27", name: "icon 27", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-28", name: "icon 28", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-29", name: "icon 29", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-30", name: "icon 30", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-31", name: "icon 31", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-32", name: "icon 32", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-33", name: "icon 33", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-34", name: "icon 34", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-35", name: "icon 35", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-36", name: "icon 36", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-37", name: "icon 37", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-38", name: "icon 38", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-39", name: "icon 39", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "gen-icon-40", name: "icon 40", role: "icon-icon", src: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Full_Star_Yellow.svg", favorite: false, tags: ["icon","gen"] },
    { id: "example-icon-8", name: "Picto Phone", role: "icon-phone", src: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png", favorite: false, tags: ["icon", "phone", "telephone", "exemple"] },
    { id: "example-icon-9", name: "Picto Globe", role: "icon-globe", src: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg", favorite: false, tags: ["icon", "globe", "web", "exemple"] },
    { id: "example-icon-10", name: "Picto Map", role: "icon-map", src: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg", favorite: true, tags: ["icon", "map", "carte", "exemple"] }
  ],
  preferences:{previewFit:"fit",zoom:1,emailMode:"outlook",editMode:true,darkPreview:false,autoSave:true,appTheme:"ragt",smartGuides:false},
  selectedLayer:"logo"
};

let state = structuredClone(DEFAULT_STATE);
let templates = [];
let backgrounds = [];
let pdfTools = [];
let studioFormats = [];
let studioElements = [];
let studioLibrarySeed = {categories:[],packs:[],assets:[]};
let studioTemplatesSeed = [];
let studioEffectsSeed = {filters:[],effects:[],presets:[]};
let studioAiSeed = {intents:[],styles:[],layouts:[],brandRules:{}};
let collabSeed = {roles:[],workflow:[],servicePacks:[],brandPolicy:{}};
let aiConnectorsSeed = {modes:[],providers:[],capabilities:[],requestSchema:{}};
let ecosystemSeed = {apiCategories:[],apiCatalog:[],apps:[],offlineStores:[],driveSupport:{}};
let backendSeed = {architecture:{},modules:[],security:[],deploymentTargets:[],env:[]};
let businessConnectorsSeed = {version:"34.0",connectors:[],workflows:[],security:[],env:[]};

function xmlText(value){
  return String(value||"").replace(/[&<>"']/g,function(m){
    if(m==="&")return "&amp;";
    if(m==="<")return "&lt;";
    if(m===">")return "&gt;";
    if(m==="\"")return "&quot;";
    return "&#39;";
  });
}
function needsLocalAssetPreview(src){
  return /^https?:\/\/(images\.unsplash\.com|upload\.wikimedia\.org)\//i.test(String(src||""));
}
function localAssetPreview(asset){
  const role=String(asset?.role||"asset").toLowerCase();
  const isWide=role.includes("background");
  const isIcon=role.includes("icon");
  const w=isWide?1200:420;
  const h=isWide?400:420;
  const palette=role.includes("motif")?["#f0fdf4","#6ba56f"]:isIcon?["#fffbeb","#deaa3f"]:role.includes("logo")?["#f0f9ff","#273540"]:["#f8fafc","#90b9d4"];
  const title=xmlText(asset?.name||"Asset local").slice(0,34);
  const label=xmlText((asset?.tags||[])[0]||role||"asset").slice(0,18).toUpperCase();
  const textAnchor=isWide?"start":"middle";
  const textX=isWide?270:210;
  const circleX=isWide?160:210;
  const circleY=isWide?200:170;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${palette[0]}"/><stop offset="1" stop-color="#ffffff"/></linearGradient><pattern id="p" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M0 42L42 0M-10 10L10 -10M32 52L52 32" stroke="${palette[1]}" stroke-opacity=".16" stroke-width="2"/></pattern></defs><rect width="100%" height="100%" rx="24" fill="url(#g)"/><rect width="100%" height="100%" rx="24" fill="url(#p)"/><circle cx="${circleX}" cy="${circleY}" r="${isIcon?70:88}" fill="${palette[1]}" fill-opacity=".18"/><rect x="${isWide?270:95}" y="${isWide?130:278}" width="${isWide?650:230}" height="18" rx="9" fill="${palette[1]}" fill-opacity=".28"/><rect x="${isWide?270:125}" y="${isWide?168:312}" width="${isWide?430:170}" height="12" rx="6" fill="${palette[1]}" fill-opacity=".18"/><text x="${textX}" y="${isWide?235:230}" text-anchor="${textAnchor}" font-family="Arial, sans-serif" font-size="${isWide?38:28}" font-weight="700" fill="#273540">${title}</text><text x="${textX}" y="${isWide?274:260}" text-anchor="${textAnchor}" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="${palette[1]}">${label}</text></svg>`;
  return "data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(svg);
}
function normalizeAssetPreview(asset){
  if(!asset||!needsLocalAssetPreview(asset.src))return asset;
  return {...asset,remoteSrc:asset.remoteSrc||asset.src,src:localAssetPreview(asset)};
}
let ecoDb = null;
let copiedStudioEffects = null;
let history = [];
let historyLog = [];
let future = [];
let drag = null;
let resize = null;
let promptProposal = null;
let deferredInstallPrompt = null;

const labels = {phone:"Téléphone", mobile:"Mobile", email:"Email", address:"Adresse", website:"Site web", linkedin:"LinkedIn", facebook:"Facebook", instagram:"Instagram", youtube:"YouTube", x:"X / Twitter"};
const socialSlots = ["website","linkedin","facebook","instagram","youtube","x"];

function clone(o){return JSON.parse(JSON.stringify(o));}
function esc(v){return String(v ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
function safeUrl(u){u=String(u||"").trim(); if(!u)return ""; if(u.startsWith("data:")||u.startsWith("mailto:")||u.startsWith("tel:"))return u; return /^https?:\/\//i.test(u)?u:"https://"+u;}
const toastQueue = [];
let toastIsShowing = false;

function toast(msg) {
  toastQueue.push(msg);
  processToastQueue();
}
window.toast = toast;

function processToastQueue() {
  if (toastIsShowing || toastQueue.length === 0) return;
  toastIsShowing = true;
  const msg = toastQueue.shift();

  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `
    <svg class="w-4 h-4 text-navy shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0"></path></svg>
    <span>${esc(msg)}</span>
  `;
  document.body.appendChild(t);

  requestAnimationFrame(() => {
    t.classList.add("show");
  });

  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => {
      t.remove();
      toastIsShowing = false;
      processToastQueue();
    }, 400);
  }, 2500);
}
function normalize(){
  state.canvas={...clone(DEFAULT_STATE.canvas),...(state.canvas||{})};
  state.identity={...clone(DEFAULT_STATE.identity),...(state.identity||{})};
  state.visible={...clone(DEFAULT_STATE.visible),...(state.visible||{})};
  state.design={...clone(DEFAULT_STATE.design),...(state.design||{})};
  state.logo={...clone(DEFAULT_STATE.logo),...(state.logo||{})};
  state.background={...clone(DEFAULT_STATE.background),...(state.background||{})};
  state.blocks={
    logo:{...clone(DEFAULT_STATE.blocks.logo),...(state.blocks?.logo||{})},
    text:{...clone(DEFAULT_STATE.blocks.text),...(state.blocks?.text||{})},
    socials:{...clone(DEFAULT_STATE.blocks.socials),...(state.blocks?.socials||{})}
  };
  state.preferences={...clone(DEFAULT_STATE.preferences),...(state.preferences||{})};
  state.assets=Array.isArray(state.assets)?state.assets:[];
  if(state.assets.length < 15){
    state.assets = clone(DEFAULT_STATE.assets);
  }
  state.assets=state.assets.map(normalizeAssetPreview);
  state.blockOrder=Array.isArray(state.blockOrder)?state.blockOrder:["logo","text","socials"];
  Object.keys(state.blocks).forEach((k,i)=>{
    state.blocks[k]={z:(i+1)*10,type:k,label:k,...state.blocks[k]};
  });
  state.blockOrder=state.blockOrder.filter(k=>state.blocks[k]);
  Object.keys(state.blocks).forEach(k=>{if(!state.blockOrder.includes(k))state.blockOrder.push(k);});
  state.selectedAssetId=state.selectedAssetId||"";
  state.collaborators=Array.isArray(state.collaborators)?state.collaborators:[];
  state.selectedCollaboratorIndex=Number.isInteger(state.selectedCollaboratorIndex)?state.selectedCollaboratorIndex:-1;
  state.bulkSettings={requiredFields:true,brandLock:false,...(state.bulkSettings||{})};
  state.ux={simpleMode:false,selectedDocumentIndex:-1,...(state.ux||{})};
  state.documents=Array.isArray(state.documents)?state.documents:[];
  state.snapshots=Array.isArray(state.snapshots)?state.snapshots:[];
  state.savedThemes=Array.isArray(state.savedThemes)?state.savedThemes:[];
  state.tools={selectedCategory:"organize",selectedTool:"merge-pdf",search:"",statusFilter:"all",workflow:[],runs:[],selectedRunId:"",...(state.tools||{})};
  state.tools.workflow=Array.isArray(state.tools.workflow)?state.tools.workflow:[];
  state.tools.runs=Array.isArray(state.tools.runs)?state.tools.runs:[];
  state.signer={open:true,signatureImage:"",annotations:[],selectedAnnotationId:"",...(state.signer||{})};
  state.signer.annotations=Array.isArray(state.signer.annotations)?state.signer.annotations:[];
  state.pdfEngine={open:true,rotation:0,watermark:"CONFIDENTIEL",watermarkOpacity:0.18,showPageNumbers:true,includeAnnotations:true,useDocumentAsBackground:true,lastRenderAt:"",finalFormat:"a4-portrait",finalQuality:0.92,lastPdfExportAt:"",...(state.pdfEngine||{})};
  state.studio={format:"signature-email",zoom:0.55,showGrid:true,snap:true,selectedPage:0,selectedObjectId:"",pages:[{id:"page_1",name:"Page 1",w:1200,h:400,bg:"#ffffff",objects:[]}],...(state.studio||{})};
  state.studio.pages=Array.isArray(state.studio.pages)&&state.studio.pages.length?state.studio.pages:[{id:"page_1",name:"Page 1",w:1200,h:400,bg:"#ffffff",objects:[]}];
  state.studio.selectedPage=Math.max(0,Math.min(state.studio.selectedPage||0,state.studio.pages.length-1));
  state.studio.pages.forEach((p,pi)=>{p.objects=Array.isArray(p.objects)?p.objects:[];p.name=p.name||`Page ${pi+1}`;p.w=p.w||1200;p.h=p.h||400;p.bg=p.bg||"#ffffff";p.objects.forEach(o=>{o.effects=normalizeStudioEffects(o.effects);});});
  state.studio.library={assets:[],templates:[],selectedCategory:"all",selectedPack:"all",search:"",templateCategory:"all",templateFavorite:"all",...(state.studio.library||{})};
  state.studio.library.assets=Array.isArray(state.studio.library.assets)?state.studio.library.assets:[];
  state.studio.library.templates=Array.isArray(state.studio.library.templates)?state.studio.library.templates:[];
  state.studio.ai={prompt:"",lastPlan:null,history:[],...(state.studio.ai||{})};
  state.studio.ai.history=Array.isArray(state.studio.ai.history)?state.studio.ai.history:[];
  state.collaboration={user:"Grégory AMADO",role:"admin",status:"draft",brandLock:true,comments:[],versions:[],activity:[],approvals:[],publishedAt:"",publishedVersionId:"",...(state.collaboration||{})};
  state.collaboration.comments=Array.isArray(state.collaboration.comments)?state.collaboration.comments:[];
  state.collaboration.versions=Array.isArray(state.collaboration.versions)?state.collaboration.versions:[];
  state.collaboration.activity=Array.isArray(state.collaboration.activity)?state.collaboration.activity:[];
  state.collaboration.approvals=Array.isArray(state.collaboration.approvals)?state.collaboration.approvals:[];
  state.connector={enabled:false,mode:"local",provider:"openai-compatible",endpoint:"",apiKey:"",customHeader:"X-API-Key",textModel:"",imageModel:"",timeout:30000,capabilities:{text:true,layout:true,design:true,image:false,document:true,translate:false,brand:true,export:false},responseMapping:"",lastRequest:null,lastResponse:null,log:[],...(state.connector||{})};
  state.connector.capabilities={text:true,layout:true,design:true,image:false,document:true,translate:false,brand:true,export:false,...(state.connector.capabilities||{})};
  state.connector.log=Array.isArray(state.connector.log)?state.connector.log:[];
  state.ecosystem={selectedType:"",selectedId:"",apiRegistry:[],apps:[],drives:[],syncQueue:[],log:[],dbReady:false,display:{fullscreen:false,density:"comfortable",panelWidth:240,studioFit:"fit"},pinned:[],...(state.ecosystem||{})};
  state.ecosystem.apiRegistry=Array.isArray(state.ecosystem.apiRegistry)?state.ecosystem.apiRegistry:[];
  state.ecosystem.apps=Array.isArray(state.ecosystem.apps)?state.ecosystem.apps:[];
  state.ecosystem.drives=Array.isArray(state.ecosystem.drives)?state.ecosystem.drives:[];
  state.ecosystem.syncQueue=Array.isArray(state.ecosystem.syncQueue)?state.ecosystem.syncQueue:[];
  state.ecosystem.log=Array.isArray(state.ecosystem.log)?state.ecosystem.log:[];
  state.ecosystem.pinned=Array.isArray(state.ecosystem.pinned)?state.ecosystem.pinned:[];
  state.ecosystem.display={fullscreen:false,density:"comfortable",panelWidth:240,studioFit:"fit",...(state.ecosystem.display||{})};
  state.backend={enabled:false,baseUrl:"http://localhost:8787",environment:"local",offlineFallback:true,authMode:"demo",authIssuer:"",authClientId:"",roleSync:true,dbType:"sqlite",storageType:"filesystem",storagePath:"./storage",proxy:{ai:true,drive:true,sharepoint:true,logs:true},deployTarget:"local",health:null,currentUser:null,log:[],...(state.backend||{})};
  state.backend.proxy={ai:true,drive:true,sharepoint:true,onedrive:true,glpi:true,exchange:true,directory:true,logs:true,...(state.backend.proxy||{})};
  state.backend.log=Array.isArray(state.backend.log)?state.backend.log:[];
  state.businessConnectors={selectedId:"sharepoint",lastTest:null,log:[],offlineQueue:[],...(state.businessConnectors||{})};
  state.businessConnectors.log=Array.isArray(state.businessConnectors.log)?state.businessConnectors.log:[];
  state.businessConnectors.offlineQueue=Array.isArray(state.businessConnectors.offlineQueue)?state.businessConnectors.offlineQueue:[];
}

function pushHistory(label = "Action"){
  const snap = clone(state);
  history.push(snap);
  historyLog.push({label, time: Date.now(), state: snap});
  if(history.length > 80) { history.shift(); historyLog.shift(); }
  future = [];
  renderStudioHistory();
}
function apply(fn, save=true, label="Modification"){
  const changeLabel=label||"Modification";
  if(save) pushHistory(changeLabel);
  fn();
  if(save){
    state.ux={...(state.ux||{}),documentDirty:true,lastModifiedAt:new Date().toISOString(),lastModifiedLabel:changeLabel};
  }
  normalize();
  syncForm();
  renderAll();
  autoSave();
}
let saveTimeout = null;
function updateSaveStatus(status) {
  const el = document.getElementById("saveStatus");
  if (!el) return;
  const text = el.querySelector(".status-text");
  el.classList.remove("saving", "saved");
  if (status === "saving") {
    el.classList.add("saving");
    text.textContent = "Enregistrement...";
  } else if (status === "saved") {
    el.classList.add("saved");
    text.textContent = "Enregistré";
    setTimeout(() => {
      if (!el.classList.contains("saving")) text.textContent = "Synchronisé";
    }, 2000);
  }
}
function autoSave() {
  if (!state.preferences.autoSave) return;
  updateSaveStatus("saving");
  
  try {
    localStorage.setItem("signaturePwaV34", JSON.stringify(state));
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      updateSaveStatus("saved");
      window.hasUnsavedCloudChanges = true;
    }, 800);
  } catch(e) {
    if (e.name === 'QuotaExceededError' || e.message.includes('quota')) {
      toast("Stockage saturé ! Supprimez des assets pour continuer à sauvegarder.");
    }
  }

}
async function loadTemplates(){
  try{const r=await fetch("./data/templates.json"); templates=(await r.json()).templates;}
  catch(e){templates=[];}
  try{const r=await fetch("./data/backgrounds.json"); backgrounds=(await r.json()).backgrounds;}
  catch(e){backgrounds=[];}
  try{const r=await fetch("./data/pdf-tools-v22.json"); pdfTools=(await r.json()).categories;}
  catch(e){pdfTools=[];}
  try{const r=await fetch("./data/annotation-tools-v23.json"); window.annotationTools=(await r.json()).tools;}
  catch(e){window.annotationTools=[];}
  try{const r=await fetch("./data/pdf-engine-v24.json"); window.pdfEngineSchema=await r.json();}
  catch(e){window.pdfEngineSchema={};}
  try{const r=await fetch("./data/pdf-export-engine-v25.json"); window.pdfExportEngineSchema=await r.json();}
  catch(e){window.pdfExportEngineSchema={};}
  try{const r=await fetch("./data/studio-formats-v26.json"); studioFormats=(await r.json()).formats;}
  catch(e){studioFormats=[];}
  try{const r=await fetch("./data/studio-elements-v26.json"); studioElements=(await r.json()).elements;}
  catch(e){studioElements=[];}
  try{const r=await fetch("./data/studio-library-v27.json"); studioLibrarySeed=await r.json();}
  catch(e){studioLibrarySeed={categories:[],packs:[],assets:[]};}
  try{const r=await fetch("./data/studio-templates-v27.json"); studioTemplatesSeed=(await r.json()).templates;}
  catch(e){studioTemplatesSeed=[];}
  try{const r=await fetch("./data/studio-effects-v28.json"); studioEffectsSeed=await r.json();}
  catch(e){studioEffectsSeed={filters:[],effects:[],presets:[]};}
  try{const r=await fetch("./data/studio-ai-v29.json"); studioAiSeed=await r.json();}
  catch(e){studioAiSeed={intents:[],styles:[],layouts:[],brandRules:{}};}
  try{const r=await fetch("./data/collaboration-v30.json"); collabSeed=await r.json();}
  catch(e){collabSeed={roles:[],workflow:[],servicePacks:[],brandPolicy:{}};}
  try{const r=await fetch("./data/ai-connectors-v31.json"); aiConnectorsSeed=await r.json();}
  catch(e){aiConnectorsSeed={modes:[],providers:[],capabilities:[],requestSchema:{}};}
  try{const r=await fetch("./data/ecosystem-v32.json"); ecosystemSeed=await r.json();}
  catch(e){ecosystemSeed={apiCategories:[],apiCatalog:[],apps:[],offlineStores:[],driveSupport:{}};}
  try{const r=await fetch("./data/backend-v34.json"); backendSeed=await r.json();}
  catch(e){backendSeed={architecture:{},modules:[],security:[],deploymentTargets:[],env:[]};}
  try{const r=await fetch("./data/business-connectors-v34.json"); businessConnectorsSeed=await r.json();}
  catch(e){businessConnectorsSeed={version:"34.0",connectors:[],workflows:[],security:[],env:[]};}
}
function bgCss(style,bg1,bg2){
  if(style==="solid")return bg1;
  if(style==="softGradient")return `linear-gradient(135deg,${bg1},${bg2})`;
  if(style==="diagonalGradient")return `linear-gradient(45deg,${bg1},${bg2})`;
  if(style==="radialGlow")return `radial-gradient(circle at 70% 20%,${bg2},${bg1} 64%)`;
  if(style==="dualTone")return `linear-gradient(90deg,${bg1} 0 62%,${bg2} 62% 100%)`;
  if(style==="mesh")return `radial-gradient(circle at 20% 20%,${bg2} 0,transparent 32%),radial-gradient(circle at 80% 30%,${bg2} 0,transparent 30%),${bg1}`;
  if(style==="stripes")return `repeating-linear-gradient(135deg,${bg1} 0 20px,${bg2} 20px 40px)`;
  if(style==="dots")return `radial-gradient(${bg2} 1.6px,${bg1} 1.6px)`;
  return bg1;
}
function rgb(hex){hex=(hex||"#000").replace("#","");if(hex.length===3)hex=hex.split("").map(c=>c+c).join("");const n=parseInt(hex,16);return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};}
function rgba(hex,a){const c=rgb(hex);return `rgba(${c.r},${c.g},${c.b},${a})`;}
function applyTemplate(t){
  if(!t)return;
  apply(()=>{
    state.design={...state.design,templateId:t.id,layout:t.layout,bgStyle:t.bgStyle,bg1:t.bg1,bg2:t.bg2,fg:t.fg,accent:t.accent,motif:t.motif,motifOpacity:t.motifOpacity,iconStyle:t.iconStyle};
    if(t.radius!==undefined) state.canvas.radius=t.radius;
    autoLayout(t.layout);
  });
}
function themeCatalog(){
  const saved=(state.savedThemes||[]).map(t=>({...t,category:t.category||"Personnalise"}));
  return [...saved,...templates];
}
function findTheme(id){
  return themeCatalog().find(t=>t.id===id);
}
function saveCurrentTheme(){
  const fallback=`Theme ${((state.savedThemes||[]).length||0)+1}`;
  const source=(state.identity.company||state.design.templateId||"Theme").trim();
  const name=`${source} ${fallback}`.slice(0,80);
  const theme={
    id:"custom-theme-"+Date.now(),
    name,
    category:"Personnalise",
    layout:state.design.layout,
    bgStyle:state.design.bgStyle,
    bg1:state.design.bg1,
    bg2:state.design.bg2,
    fg:state.design.fg,
    accent:state.design.accent,
    motif:state.design.motif,
    motifOpacity:state.design.motifOpacity,
    iconStyle:state.design.iconStyle,
    radius:state.canvas.radius,
    savedAt:new Date().toISOString()
  };
  apply(()=>{
    state.savedThemes.unshift(theme);
    state.design.templateId=theme.id;
  }, true, "Theme sauvegarde");
  
  try {
    localStorage.setItem("signaturePwaV34", JSON.stringify(state));
    toast("Theme enregistre dans la galerie.");
  } catch(e) {
    if (e.name === 'QuotaExceededError' || e.message.includes('quota')) {
      toast("Stockage saturé ! Impossible de sauvegarder le thème.");
    }
  }

}
function autoLayout(layout=state.design.layout){
  const w=state.canvas.width,h=state.canvas.height;
  if(layout==="clean-divider"){
    state.blocks.logo={...state.blocks.logo,x:90,y:92,w:330,h:210,visible:true,locked:false};
    state.blocks.text={...state.blocks.text,x:520,y:70,w:w-590,h:250,visible:true,locked:false};
    state.blocks.socials={...state.blocks.socials,x:520,y:h-82,w:460,h:52,visible:true,locked:false};
  }else if(layout==="tech-panel"||layout==="right-info"){
    state.blocks.logo={...state.blocks.logo,x:95,y:86,w:330,h:220,visible:true,locked:false};
    state.blocks.text={...state.blocks.text,x:560,y:68,w:w-640,h:250,visible:true,locked:false};
    state.blocks.socials={...state.blocks.socials,x:560,y:h-86,w:480,h:54,visible:true,locked:false};
  }else{
    state.blocks.logo={...state.blocks.logo,x:80,y:84,w:340,h:230,visible:true,locked:false};
    state.blocks.text={...state.blocks.text,x:470,y:66,w:w-540,h:255,visible:true,locked:false};
    state.blocks.socials={...state.blocks.socials,x:470,y:h-82,w:480,h:52,visible:true,locked:false};
  }
}
function renderTemplates(){
  if(!$("templatesGrid")) return;
  const q=($("templateSearch")?.value||"").toLowerCase();
  const f=$("templateFilter")?.value||"all";
  const list=themeCatalog().filter(t=>(f==="all"||t.category===f) && (!q||t.name.toLowerCase().includes(q)||t.category.toLowerCase().includes(q)));
  $("templatesGrid").innerHTML=list.map(t=>`<div class="template-card ${state.design.templateId===t.id?"active":""}">
    <div class="template-thumb" style="background:${bgCss(t.bgStyle,t.bg1,t.bg2)};color:${t.fg}"></div>
    <strong>${esc(t.name)}</strong><span>${esc(t.category)}</span>
    <div class="actions"><button data-use-template="${t.id}">Utiliser</button><button class="secondary" data-dup-template="${t.id}">Dupliquer</button></div>
  </div>`).join("");
  document.querySelectorAll("[data-use-template]").forEach(b=>b.onclick=()=>applyTemplate(findTheme(b.dataset.useTemplate)));
  document.querySelectorAll("[data-dup-template]").forEach(b=>b.onclick=()=>{
    const t=clone(findTheme(b.dataset.dupTemplate));
    if(!t)return;
    t.id="custom-theme-"+Date.now();
    t.name+=" copie";
    t.category="Personnalise";
    t.savedAt=new Date().toISOString();
    apply(()=>state.savedThemes.unshift(t), true, "Duplication theme");
    toast("Modele duplique dans la galerie.");
  });
}

function renderBackgrounds(){
  if(!$("backgroundsGrid")) return;
  const q=($("backgroundSearch")?.value||"").toLowerCase();
  const f=$("backgroundFilter")?.value||"all";
  const list=backgrounds.filter(b=>(f==="all"||b.category===f)&&(!q||b.name.toLowerCase().includes(q)||b.category.toLowerCase().includes(q)));
  $("backgroundsGrid").innerHTML=list.map(b=>`<div class="bg-card ${state.design.bg1===b.bg1&&state.design.bg2===b.bg2?"active":""}">
    <div class="bg-thumb" style="background:${bgCss(b.bgStyle,b.bg1,b.bg2)};color:${b.fg}">
      <div class="mock-logo"></div><div class="mock-title"></div>
    </div>
    <strong>${esc(b.name)}</strong><span>${esc(b.category)}</span>
    <div class="actions"><button data-use-bg="${b.id}">Appliquer</button><button class="secondary" data-preview-bg="${b.id}">Aperçu</button></div>
  </div>`).join("");
  document.querySelectorAll("[data-use-bg]").forEach(btn=>btn.onclick=()=>applyBackground(backgrounds.find(b=>b.id===btn.dataset.useBg)));
  document.querySelectorAll("[data-preview-bg]").forEach(btn=>btn.onclick=()=>showBackgroundPreview(backgrounds.find(b=>b.id===btn.dataset.previewBg)));
}
function showBackgroundPreview(bg){
  if(!bg)return;
  document.querySelector("#backgroundPreviewModal")?.remove();
  const modal=document.createElement("div");
  modal.id="backgroundPreviewModal";
  modal.className="background-preview-modal";
  modal.innerHTML=`
    <div class="background-preview-box" role="dialog" aria-modal="true" aria-labelledby="backgroundPreviewTitle">
      <div class="background-preview-head">
        <div>
          <span>Apercu de fond</span>
          <h3 id="backgroundPreviewTitle">${esc(bg.name)}</h3>
        </div>
        <button id="backgroundPreviewCloseBtn" type="button">Fermer</button>
      </div>
      <div class="background-preview-card" style="background:${bgCss(bg.bgStyle,bg.bg1,bg.bg2)};color:${bg.fg};border-radius:${state.canvas.radius||24}px">
        <div class="background-preview-logo" style="border-color:${rgba(bg.fg,.34)};background:${rgba(bg.accent||bg.fg,.14)}">Logo</div>
        <div class="background-preview-copy">
          <strong>${esc((state.identity.firstName||"FIRSTNAME")+" "+(state.identity.lastName||"LASTNAME"))}</strong>
          <span>${esc(state.identity.jobTitle||"MARKETING MANAGER")}</span>
          <p>${esc(state.identity.phone||"+33 0 00 00 00 00")} - ${esc(state.identity.email||"prenom.nom@ragt.com")}</p>
        </div>
      </div>
      <div class="background-preview-foot">
        <button id="backgroundPreviewApplyBtn" type="button">Appliquer ce fond</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  const close=()=>modal.remove();
  $("backgroundPreviewCloseBtn").onclick=close;
  $("backgroundPreviewApplyBtn").onclick=()=>{applyBackground(bg);close();};
  modal.onclick=e=>{if(e.target===modal)close();};
}
function applyBackground(bg){
  if(!bg)return;
  apply(()=>{
    state.design.bgStyle=bg.bgStyle;
    state.design.bg1=bg.bg1;
    state.design.bg2=bg.bg2;
    state.design.fg=bg.fg;
    state.design.accent=bg.accent;
    state.design.motif=bg.motif;
    state.design.layout=bg.layout;
    autoLayout(bg.layout);
  });
}

function renderPictos(){
  if(!$("pictosGrid")) return;
  document.querySelectorAll("[data-icon-style]").forEach(b=>b.classList.toggle("active",b.dataset.iconStyle===state.design.iconStyle));
  const list=[
    ["phone","Téléphone","☎"],["mobile","Mobile","✆"],["email","Email","✉"],["address","Adresse","●"],["website","Site","◎"],
    ["linkedin","LinkedIn","in"],["facebook","Facebook","f"],["instagram","Instagram","ig"],["youtube","YouTube","▶"],["x","X","𝕏"]
  ];
  $("pictosGrid").innerHTML=list.map(([key,label,sym])=>`<div class="picto-card" data-picto="${key}">
    <div class="picto-preview">${state.design.customIcons?.[key]?'<img src="'+state.design.customIcons[key]+'" style="max-width:24px;max-height:24px">':sym}</div>
    <strong>${label}</strong>
  </div>`).join("");
  if($("iconSlotGrid")){
    $("iconSlotGrid").innerHTML=list.map(([key,label,sym])=>`<div class="icon-slot-card">
      <div class="slot-preview">${state.design.customIcons?.[key]?'<img src="'+state.design.customIcons[key]+'">':sym}</div>
      <strong>${label}</strong>
      <button data-custom-icon="${key}">Importer</button>
      <button class="secondary" data-reset-icon="${key}">Reset</button>
    </div>`).join("");
    document.querySelectorAll("[data-custom-icon]").forEach(b=>b.onclick=()=>{state.pendingIconSlot=b.dataset.customIcon;$("customIconInput").value="";$("customIconInput").click();});
    document.querySelectorAll("[data-reset-icon]").forEach(b=>b.onclick=()=>apply(()=>{delete state.design.customIcons[b.dataset.resetIcon];}));
  }
}

function icon(slot){
  const custom=state.design.customIcons?.[slot];
  const map={phone:"☎",mobile:"✆",email:"✉",address:"●",website:"◎",linkedin:"in",facebook:"f",instagram:"ig",youtube:"▶",x:"𝕏"};
  const minimal=state.design.iconStyle==="minimal";
  const border=state.design.iconStyle==="outline" ? `2px solid ${state.design.accent}`:"0";
  const bg=(state.design.iconStyle==="solid"||state.design.iconStyle==="badge") ? state.design.accent:"transparent";
  const content=custom?`<img src="${custom}" style="max-width:18px;max-height:18px;display:block">`:(map[slot]||"?");
  return `<span class="ico" style="background:${minimal?'transparent':bg};border:${minimal?'0':border};color:${state.design.fg}">${content}</span>`;
}
function motifSvg(){
  const w=state.canvas.width,h=state.canvas.height,c=rgba(state.design.accent,state.design.motifOpacity);
  let o="";
  if(state.design.motif==="none")return "";
  if(state.design.motif==="outline"){o+=`<polygon points="${w*.58},10 ${w-40},8 ${w-60},${h*.28} ${w*.64},${h*.24}" fill="none" stroke="${c}" stroke-width="8"/>`;}
  if(state.design.motif==="lines"){for(let y=40;y<h;y+=34)o+=`<line x1="${w*.48}" y1="${y}" x2="${w-40}" y2="${y}" stroke="${c}" stroke-width="1"/>`;}
  if(state.design.motif==="corner"){o+=`<path d="M${w*.66} 18 H${w-24} V${h*.28}" fill="none" stroke="${c}" stroke-width="9"/>`;}
  if(state.design.motif==="hex"){for(let i=0;i<8;i++){const x=w*.66+i*48,y=28+(i%2)*36;o+=`<polygon points="${x},${y} ${x+20},${y+12} ${x+20},${y+34} ${x},${y+46} ${x-20},${y+34} ${x-20},${y+12}" fill="none" stroke="${c}" stroke-width="2"/>`;}}
  if(state.design.motif==="topo"){for(let i=0;i<9;i++)o+=`<path d="M${-30+i*24} ${20+i*20} C${w*.2} ${i*20},${w*.4} ${h*.45+i*6},${w*.7} ${h*.22+i*20} S${w+40} ${h*.7+i*10},${w+80} ${h*.45+i*10}" fill="none" stroke="${c}" stroke-width="1.2"/>`;}
  if(state.design.motif==="fields"){for(let i=0;i<14;i++)o+=`<path d="M${i*32} ${h} Q${w*.3+i*16} ${h*.64},${w*.45+i*26} ${h*.08}" fill="none" stroke="${c}" stroke-width="2"/>`;}
  if(state.design.motif==="leaf"){o+=`<ellipse cx="${w*.82}" cy="${h*.36}" rx="24" ry="58" fill="${c}" transform="rotate(30 ${w*.82} ${h*.36})"/>`;}
  if(state.design.motif==="cards"){o+=`<rect x="${w*.05}" y="${h*.12}" width="${w*.28}" height="${h*.55}" rx="28" fill="${c}"/><rect x="${w*.70}" y="${h*.12}" width="${w*.24}" height="${h*.34}" rx="28" fill="${c}"/>`;}
  return `<svg class="motif-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${o}</svg>`;
}
function bgImageHtml(){
  if(!state.background.src)return "";
  const fit=state.background.fit==="stretch"?"fill":state.background.fit;
  return `<div class="bg-img"><img src="${state.background.src}" style="object-fit:${fit};opacity:${state.background.opacity}">${state.background.overlay?`<div style="position:absolute;inset:0;background:${state.design.bg1};mix-blend-mode:multiply;opacity:.38"></div>`:""}</div>`;
}
function layoutShape(){
  const w=state.canvas.width,h=state.canvas.height,a=state.design.accent,l=state.design.layout;
  if(l==="split-curve")return `<div class="layout-shape" style="left:${w*.31}px;top:-${h*.25}px;width:${h*.95}px;height:${h*1.5}px;border-right:28px solid ${a};border-radius:50%;opacity:.55"></div>`;
  if(l==="clean-divider")return `<div class="layout-shape" style="left:${w*.39}px;top:${h*.16}px;bottom:${h*.16}px;width:2px;background:${a};opacity:.8"></div>`;
  if(l==="diagonal")return `<div class="layout-shape" style="left:${w*.34}px;top:0;bottom:0;width:${w*.08}px;background:${a};transform:skewX(-16deg);opacity:.45"></div>`;
  if(l==="tech-panel")return `<div class="layout-shape" style="left:${w*.34}px;top:0;bottom:0;width:130px;border-left:4px solid ${a};border-right:2px solid ${a};transform:skewX(-14deg);opacity:.7"></div>`;
  if(l==="right-info")return `<div class="layout-shape" style="right:0;top:0;bottom:0;width:${w*.42}px;background:${rgba(a,.25)}"></div>`;
  return "";
}
function logoHtml(){
  if(state.logo.src)return `<img class="logo-img" src="${state.logo.src}" alt="Logo" style="width:${state.logo.size}px;opacity:${state.logo.opacity};${state.logo.shadow?"filter:drop-shadow(0 10px 16px rgba(0,0,0,.28))":""}">`;
  return `<span class="logo-placeholder" style="width:${Math.min(state.logo.size,state.blocks.logo.w)}px;height:${Math.round(Math.min(state.logo.size,state.blocks.logo.w)*.62)}px;color:${state.design.fg}">Cliquer<br>pour logo</span>`;
}
function contactRows(){
  const i=state.identity, rows=[];
  if(state.visible.phone)rows.push(["phone",i.phone||"+33 0 00 00 00 00",`tel:${(i.phone||"").replace(/\s/g,"")}`]);
  if(state.visible.mobile)rows.push(["mobile",i.mobile||"+33 0 00 00 00 00",`tel:${(i.mobile||"").replace(/\s/g,"")}`]);
  if(state.visible.email)rows.push(["email",i.email||"prenom.nom@ragt.com",`mailto:${i.email||""}`]);
  if(state.visible.address)rows.push(["address",i.address||"123 Anywhere Street, City",""]);
  if(state.visible.website)rows.push(["website",i.website||"www.ragt.com",safeUrl(i.website||"www.ragt.com")]);
  return rows.map(([s,t,u])=>`<tr><td>${icon(s)}</td><td>${u?`<a href="${u}" style="color:${state.design.fg};text-decoration:none">${esc(t)}</a>`:esc(t)}</td></tr>`).join("");
}
function socials(){
  return socialSlots.filter(s=>state.visible[s]&&(state.identity[s]||["linkedin","facebook","instagram"].includes(s))).map(s=>`<a href="${safeUrl(state.identity[s]||"https://www.ragt.com")}" style="color:${state.design.fg}">${icon(s)}</a>`).join("");
}
function blockStyle(k){const b=state.blocks[k];return `left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;display:${b.visible?"block":"none"}`;}
function blockHandle(k){return state.preferences.editMode&&!state.blocks[k].locked?`<span class="drag-handle">↕</span><span class="resize-handle" data-resize="${k}"></span>`:"";}
function renderBlock(k){
  const b=state.blocks[k];
  if(!b) return "";
  const selected=state.selectedLayer===k?"selected":"";
  const common=`class="editable-block ${selected}" data-block="${k}" style="${blockStyle(k)};z-index:${b.z||10};${b.type==='text'||b.type==='customText'?'color:'+state.design.fg:''}"`;
  if(b.type==="logo" || k==="logo"){
    return `<div ${common.replace('display:block', 'display:flex')}>${blockHandle(k)}<div class="logo-zone">${logoHtml()}</div></div>`;
  }
  if(b.type==="text" || k==="text"){
    return `<div ${common}>
      ${blockHandle(k)}
      <div class="name">${esc((state.identity.firstName||"FIRSTNAME")+" "+(state.identity.lastName||"LASTNAME"))}</div>
      <div class="title" style="color:${state.design.accent}">${esc(state.identity.jobTitle||"MARKETING MANAGER")}</div>
      <div class="small-line" style="background:${state.design.accent}"></div>
      <table class="contact-table">${contactRows()}</table>
    </div>`;
  }
  if(b.type==="socials" || k==="socials"){
    return `<div ${common}>${blockHandle(k)}<div class="socials">${socials()}</div></div>`;
  }
  if(b.type==="customText"){
    return `<div ${common}>${blockHandle(k)}<div class="custom-text-block">${esc(b.content||"Texte dupliqué")}</div></div>`;
  }
  return "";
}
function renderSignature(){
  const bg=bgCss(state.design.bgStyle,state.design.bg1,state.design.bg2);
  const edit=state.preferences.editMode?" edit-mode":"";
  const ordered=state.blockOrder.filter(k=>state.blocks[k]).sort((a,b)=>(state.blocks[a].z||0)-(state.blocks[b].z||0));
  $("signaturePreview").innerHTML=`<div class="signature-card${edit}" style="width:${state.canvas.width}px;height:${state.canvas.height}px;border-radius:${state.canvas.radius}px;background:${bg};color:${state.design.fg}">
    ${bgImageHtml()}${motifSvg()}${layoutShape()}
    ${ordered.map(k=>renderBlock(k)).join("")}
  </div>`;
  bindPreviewBlocks();
  fitPreview();
  $("previewWrap").classList.toggle("dark",state.preferences.darkPreview);
}
function bindPreviewBlocks(){
  document.querySelectorAll(".resize-handle").forEach(h=>{
    h.onmousedown=e=>{
      e.stopPropagation();
      e.preventDefault();
      const k=h.dataset.resize;
      state.selectedLayer=k;
      renderLayers();
      if(state.blocks[k].locked||!state.preferences.editMode)return;
      const rect=$("signaturePreview").getBoundingClientRect();
      const scale=rect.width/state.canvas.width||1;
      resize={k,startX:e.clientX,startY:e.clientY,ow:state.blocks[k].w,oh:state.blocks[k].h,scale};
      h.closest(".editable-block")?.classList.add("resizing");
    };
  });
  document.querySelectorAll(".editable-block").forEach(el=>{
    const k=el.dataset.block;
    el.onmousedown=e=>{
      if(e.target.closest("a"))return;
      e.preventDefault();
      state.selectedLayer=k;
      renderLayers();
      if(!state.preferences.editMode||state.blocks[k].locked)return;
      const rect=$("signaturePreview").getBoundingClientRect();
      const scale=rect.width/state.canvas.width||1;
      drag={k,startX:e.clientX,startY:e.clientY,ox:state.blocks[k].x,oy:state.blocks[k].y,scale};
      document.body.classList.add("dragging");
    };
  });
  const z=document.querySelector(".logo-zone");
  if(z)z.ondblclick=e=>{e.stopPropagation();$("logoInput").click();};
}
document.addEventListener("mousemove",e=>{
  if(resize){
    const b=state.blocks[resize.k];
    b.w=Math.max(60,Math.round(resize.ow+(e.clientX-resize.startX)/resize.scale));
    b.h=Math.max(40,Math.round(resize.oh+(e.clientY-resize.startY)/resize.scale));
    renderSignature(); syncProps();
    return;
  }
  if(!drag)return;
  state.blocks[drag.k].x=Math.round(drag.ox+(e.clientX-drag.startX)/drag.scale);
  state.blocks[drag.k].y=Math.round(drag.oy+(e.clientY-drag.startY)/drag.scale);
  if(state.preferences.smartGuides) applySmartGuides(drag.k);
  else clearSmartGuides();
  renderSignature(); syncProps();
  syncAppearanceControls();
});
document.addEventListener("mouseup",()=>{
  if(resize){resize=null;document.querySelectorAll(".resizing").forEach(e=>e.classList.remove("resizing"));autoSave();}
  if(drag){drag=null;clearSmartGuides();document.body.classList.remove("dragging");autoSave();}
});

function applySmartGuides(layerKey) {
  clearSmartGuides();
  const current = state.blocks[layerKey];
  if (!current) return;
  const tolerance = 5;
  let snappedX = false;
  let snappedY = false;
  const otherKeys = state.blockOrder.filter(k => k !== layerKey && state.blocks[k] && state.blocks[k].visible !== false);
  const guides = [];

  const cx = current.x + current.w / 2;
  const cy = current.y + current.h / 2;
  const rx = current.x + current.w;
  const ry = current.y + current.h;
  
  for (const k of otherKeys) {
    const o = state.blocks[k];
    const ocx = o.x + o.w / 2;
    const ocy = o.y + o.h / 2;
    const orx = o.x + o.w;
    const ory = o.y + o.h;
    
    if (!snappedX) {
      if (Math.abs(current.x - o.x) < tolerance) { current.x = o.x; snappedX = true; guides.push({type: 'v', x: o.x}); }
      else if (Math.abs(rx - orx) < tolerance) { current.x = orx - current.w; snappedX = true; guides.push({type: 'v', x: orx}); }
      else if (Math.abs(cx - ocx) < tolerance) { current.x = ocx - current.w/2; snappedX = true; guides.push({type: 'v', x: ocx}); }
      else if (Math.abs(current.x - orx) < tolerance) { current.x = orx; snappedX = true; guides.push({type: 'v', x: orx}); }
      else if (Math.abs(rx - o.x) < tolerance) { current.x = o.x - current.w; snappedX = true; guides.push({type: 'v', x: o.x}); }
    }
    if (!snappedY) {
      if (Math.abs(current.y - o.y) < tolerance) { current.y = o.y; snappedY = true; guides.push({type: 'h', y: o.y}); }
      else if (Math.abs(ry - ory) < tolerance) { current.y = ory - current.h; snappedY = true; guides.push({type: 'h', y: ory}); }
      else if (Math.abs(cy - ocy) < tolerance) { current.y = ocy - current.h/2; snappedY = true; guides.push({type: 'h', y: ocy}); }
      else if (Math.abs(current.y - ory) < tolerance) { current.y = ory; snappedY = true; guides.push({type: 'h', y: ory}); }
      else if (Math.abs(ry - o.y) < tolerance) { current.y = o.y - current.h; snappedY = true; guides.push({type: 'h', y: o.y}); }
    }
  }

  const container = $("signaturePreview");
  if (!container) return;
  guides.forEach(g => {
    const line = document.createElement("div");
    line.className = "smart-guide";
    line.style.position = "absolute";
    line.style.backgroundColor = "#3b82f6";
    line.style.zIndex = "999";
    line.style.pointerEvents = "none";
    if (g.type === 'v') {
      line.style.left = g.x + "px";
      line.style.top = "0px";
      line.style.bottom = "0px";
      line.style.width = "1px";
    } else {
      line.style.top = g.y + "px";
      line.style.left = "0px";
      line.style.right = "0px";
      line.style.height = "1px";
    }
    container.appendChild(line);
  });
}

function clearSmartGuides() {
  const container = $("signaturePreview");
  if (!container) return;
  container.querySelectorAll(".smart-guide").forEach(el => el.remove());
}
function fitPreview(){
  const card=document.querySelector(".signature-card"),wrap=$("previewWrap"); if(!card||!wrap)return;
  let s=state.preferences.zoom;
  if(state.preferences.previewFit==="fit")s=Math.min(1.06,Math.max(.22,Math.min((wrap.clientWidth-34)/state.canvas.width,(wrap.clientHeight-34)/state.canvas.height)));
  if(state.preferences.previewFit==="wide")s=Math.min(1.18,Math.max(.28,(wrap.clientWidth-24)/state.canvas.width));
  $("signaturePreview").style.transform=`scale(${s})`;
  $("signaturePreview").style.transformOrigin="top left";
  if($("signaturePreviewSizer")){
    $("signaturePreviewSizer").style.width=(state.canvas.width*s)+"px";
    $("signaturePreviewSizer").style.height=(state.canvas.height*s)+"px";
  }
}
function renderToggles(){
  $("fieldToggles").innerHTML=Object.entries(labels).map(([k,v])=>`<label class="toggle-card"><span>${v}</span><input type="checkbox" data-vis="${k}" ${state.visible[k]?"checked":""}></label>`).join("");
  document.querySelectorAll("[data-vis]").forEach(c=>c.onchange=()=>apply(()=>state.visible[c.dataset.vis]=c.checked));
}
function assetKind(a){
  const r=(a.role||a.type||"").toLowerCase();
  if(r.includes("background")) return "background";
  if(r.includes("icon")) return "icon";
  if(r.includes("logo")) return "logo";
  if(r.includes("motif") || r.includes("pattern")) return "motif";
  if(r.includes("shape") || r.includes("forme") || r.includes("layer")) return "shape";
  return "asset";
}
function assetFormat(a){
  const src=String(a?.src||"").toLowerCase();
  const name=String(a?.name||"").toLowerCase();
  if(src.startsWith("http://")||src.startsWith("https://")) return "url";
  if(src.includes("image/svg")||name.endsWith(".svg")) return "svg";
  if(src.includes("image/png")||name.endsWith(".png")) return "png";
  if(src.includes("image/webp")||name.endsWith(".webp")) return "webp";
  if(src.includes("image/jpeg")||src.includes("image/jpg")||/\.(jpe?g)$/i.test(name)) return "jpg";
  return src.startsWith("data:")?"data":"file";
}
function libraryBaseAssets(){
  const base=[...(state.assets||[])];
  if(state.logo?.src)base.unshift({id:"current-logo",name:state.logo.name||"Logo principal",role:"logo",src:state.logo.src,favorite:true,tags:state.logo.tags||["logo","actif"]});
  if(state.background?.src)base.unshift({id:"current-bg",name:state.background.name||"Fond image",role:"background",src:state.background.src,favorite:true,tags:state.background.tags||["fond","actif"]});
  return base;
}
function syncLibraryNavActive(filterValue){
  const map={libNavAll:"all",libNavLogos:"logo",libNavBackgrounds:"background",libNavIcons:"icon",libNavMotifs:"motif",libNavShapes:"shape",libNavFavorites:"favorite"};
  Object.entries(map).forEach(([id,value])=>{
    const nav=$(id);
    if(!nav)return;
    const active=value===filterValue;
    nav.classList.toggle("bg-slate-200",active);
    nav.classList.toggle("text-slate-800",active);
    nav.classList.toggle("hover:bg-slate-100",!active);
    nav.classList.toggle("text-slate-700",!active);
    nav.classList.toggle("bg-transparent",!active);
  });
}
function syncLibraryTagButtons(){
  const active=(state.library?.activeTag||"all").toLowerCase();
  document.querySelectorAll("[data-tag-filter]").forEach(btn=>{
    const isActive=(btn.dataset.tagFilter||"all").toLowerCase()===active;
    btn.classList.toggle("bg-navy",isActive);
    btn.classList.toggle("text-white",isActive);
    btn.classList.toggle("bg-white",!isActive);
    btn.classList.toggle("text-slate-500",!isActive);
  });
}
function showLibraryStorageDetails(){
  const base=libraryBaseAssets();
  const bytes=base.reduce((sum,a)=>sum+(String(a.src||"").startsWith("data:")?Math.round(String(a.src).length*.75):0),0);
  const byKind=base.reduce((acc,a)=>{const k=assetKind(a);acc[k]=(acc[k]||0)+1;return acc;},{});
  const report={generatedAt:new Date().toISOString(),assets:base.length,storageBytes:bytes,storageMb:+(bytes/1024/1024).toFixed(2),byKind};
  const modal=document.createElement("div");
  modal.id="libraryStorageModal";
  modal.className="fixed inset-0 z-[99999] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4";
  modal.innerHTML=`
    <div class="bg-white border border-slate-200 rounded-2xl shadow-2xl w-[440px] max-w-[92vw] p-6">
      <div class="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 class="text-base font-bold text-slate-800">Stockage bibliotheque</h3>
          <p class="text-sm text-slate-500 mt-1">Etat local des assets et medias importes.</p>
        </div>
        <button id="libraryStorageCloseBtn" class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold">Fermer</button>
      </div>
      <div class="grid gap-2 text-sm">
        <div class="flex justify-between border border-slate-100 rounded-xl px-3 py-2"><span>Assets</span><strong>${base.length}</strong></div>
        <div class="flex justify-between border border-slate-100 rounded-xl px-3 py-2"><span>Stockage base64</span><strong>${report.storageMb} Mo / 50 Mo</strong></div>
        <div class="flex justify-between border border-slate-100 rounded-xl px-3 py-2"><span>Logos</span><strong>${byKind.logo||0}</strong></div>
        <div class="flex justify-between border border-slate-100 rounded-xl px-3 py-2"><span>Fonds</span><strong>${byKind.background||0}</strong></div>
        <div class="flex justify-between border border-slate-100 rounded-xl px-3 py-2"><span>Pictos</span><strong>${byKind.icon||0}</strong></div>
      </div>
      <button id="libraryStorageExportBtn" class="w-full mt-4 py-2.5 bg-navy text-white rounded-xl text-xs font-bold">Exporter le rapport stockage</button>
    </div>`;
  document.querySelector("#libraryStorageModal")?.remove();
  document.body.appendChild(modal);
  $("libraryStorageCloseBtn").onclick=()=>modal.remove();
  modal.onclick=e=>{if(e.target===modal)modal.remove();};
  $("libraryStorageExportBtn").onclick=()=>download("rapport-stockage-bibliotheque.json",JSON.stringify(report,null,2),"application/json");
}
function importSelectedLibraryAssetsToStudio(){
  const ids=state.selectedAssetsForBatch||[];
  if(!ids.length)return toast("Aucun asset selectionne.");
  const base=libraryBaseAssets();
  let imported=0;
  ids.forEach(id=>{
    const a=base.find(x=>(x.id||"")===id);
    if(a?.src){addStudioImage(a.src,a.name||"asset");imported++;}
  });
  state.selectedAssetsForBatch=[];
  renderAssets();
  showView("studio");
  toast(`${imported} asset(s) ajoutes au Studio.`);
}
function deleteSelectedLibraryAssets(){
  const ids=state.selectedAssetsForBatch||[];
  if(!ids.length)return toast("Aucun asset selectionne.");
  showConfirmModal("Supprimer les assets ?", `${ids.length} asset(s) selectionne(s) seront supprimes de la bibliotheque.`,()=>{
    apply(()=>{
      state.assets=state.assets.filter(a=>!ids.includes(a.id));
      if(ids.includes("current-logo")){state.logo.src="";state.logo.name="";}
      if(ids.includes("current-bg")){state.background.src="";state.background.name="";}
      state.selectedAssetsForBatch=[];
    });
  });
}
function renderAssets(){
  state.library=state.library||{};
  const base=libraryBaseAssets();
  
  // Calculate counts for sidebar
  const counts = { all: base.length, logos: 0, backgrounds: 0, icons: 0, motifs: 0, shapes: 0, favorites: 0 };
  let totalStorageBytes = 0;
  base.forEach(a => {
    const kind = assetKind(a);
    if(kind === "logo") counts.logos++;
    else if(kind === "background") counts.backgrounds++;
    else if(kind === "icon") counts.icons++;
    else if(kind === "motif") counts.motifs++;
    else if(kind === "shape") counts.shapes++;
    if(a.favorite) counts.favorites++;
    if(a.src && a.src.startsWith("data:")) {
      totalStorageBytes += Math.round(a.src.length * 0.75); // rough base64 byte size
    }
  });

  if($("libCountAll")) $("libCountAll").textContent = counts.all;
  if($("libCountLogos")) $("libCountLogos").textContent = counts.logos;
  if($("libCountBackgrounds")) $("libCountBackgrounds").textContent = counts.backgrounds;
  if($("libCountIcons")) $("libCountIcons").textContent = counts.icons;
  if($("libCountMotifs")) $("libCountMotifs").textContent = counts.motifs;
  if($("libCountShapes")) $("libCountShapes").textContent = counts.shapes;
  if($("libCountFavorites")) $("libCountFavorites").textContent = counts.favorites;

  
  const catsContainer=$("customCategoriesContainer");
  if(catsContainer){
    catsContainer.innerHTML=(state.libraryCategories||[]).map(cat=>{
      const active=(state.library.activeTag||"").toLowerCase()===cat.toLowerCase();
      const c=base.filter(a=>assetKind(a)===cat||(a.tags||[]).map(t=>t.toLowerCase()).includes(cat.toLowerCase())).length;
      return `<button onclick="apply(()=>{state.library.activeTag='${cat}';})" class="w-full text-left px-3 py-2 rounded-lg ${active?'bg-slate-200 text-slate-800':'bg-transparent hover:bg-slate-100 text-slate-700'} font-semibold text-sm flex items-center justify-between"><div class="flex items-center gap-3"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>${esc(cat)}</div><span class="text-slate-400 text-xs font-medium">${c}</span></button>`;
    }).join("");
  }
  const maxStorage = 50 * 1024 * 1024; // 50 MB
  const usedStorageMb = (totalStorageBytes / (1024 * 1024)).toFixed(2);
  const storagePct = Math.min(100, Math.round((totalStorageBytes / maxStorage) * 100));
  if($("libStorageText")) $("libStorageText").textContent = `${usedStorageMb} Mo / 50 Mo`;
  if($("libStorageBar")) $("libStorageBar").style.width = `${storagePct}%`;

  const q=($("assetSearch")?.value||"").toLowerCase();
  const f=$("assetFilter")?.value||"all";
  const fmt=$("assetFormatFilter")?.value||"all";
  const sort=$("assetSortFilter")?.value||"recent";
  const tag=(state.library.activeTag||"all").toLowerCase();
  let list=base.map((a,i)=>({...a,_i:i,id:a.id||("asset-"+i)})).filter(a=>{
    const kind=assetKind(a);
    const tags=(a.tags||[]).map(t=>String(t).toLowerCase());
    const text=((a.name||"")+" "+tags.join(" ")+" "+kind+" "+assetFormat(a)).toLowerCase();
    const formatOk=fmt==="all" || (fmt==="url"?assetFormat(a)==="url":assetFormat(a)===fmt);
    const tagOk=tag==="all" || tags.includes(tag) || text.includes(tag);
    return (f==="all" || (f==="favorite"?a.favorite:kind===f)) && formatOk && tagOk && (!q || text.includes(q));
  });
  if(sort==="name")list.sort((a,b)=>String(a.name||"").localeCompare(String(b.name||""),"fr"));
  if(sort==="type")list.sort((a,b)=>assetKind(a).localeCompare(assetKind(b),"fr")||String(a.name||"").localeCompare(String(b.name||""),"fr"));
  if(sort==="favorite")list.sort((a,b)=>(b.favorite?1:0)-(a.favorite?1:0)||String(a.name||"").localeCompare(String(b.name||""),"fr"));
  syncLibraryNavActive(f);
  syncLibraryTagButtons();

  if($("libPaginationCount")) $("libPaginationCount").textContent = list.length;
  let selectedAsset = list.find(a => a.id === state.selectedAssetId);
  if (!selectedAsset && list.length > 0) {
    state.selectedAssetId = list[0].id;
    selectedAsset = list[0];
  }

  const isListView = state.preferences?.libraryViewMode === "list";
  if($("assetGrid")) {
    $("assetGrid").className = isListView 
      ? "flex flex-col gap-2" 
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start";
  }
  
  if($("libViewGridBtn")) {
    $("libViewGridBtn").className = isListView ? "p-1.5 text-slate-400 hover:text-slate-700" : "p-1.5 bg-white shadow-sm rounded-md text-slate-700";
  }
  if($("libViewListBtn")) {
    $("libViewListBtn").className = isListView ? "p-1.5 bg-white shadow-sm rounded-md text-slate-700" : "p-1.5 text-slate-400 hover:text-slate-700";
  }

  state.selectedAssetsForBatch = state.selectedAssetsForBatch || [];
  
  const batchToolbar = $("libraryBatchToolbar");
  if (batchToolbar) {
    if (state.selectedAssetsForBatch.length > 0) {
      batchToolbar.classList.remove("hidden");
      $("libraryBatchCount").textContent = `${state.selectedAssetsForBatch.length} sélectionné(s)`;
    } else {
      batchToolbar.classList.add("hidden");
    }
  }

  $("assetGrid").innerHTML=list.length?list.slice(0,10).map((a,i)=>{
    const isSelected = a.id === state.selectedAssetId;
    const isChecked = state.selectedAssetsForBatch.includes(a.id);
    const borderStyle = isSelected ? 'border-navy ring-2 ring-navy bg-slate-50/50' : (a.favorite ? 'border-gold' : 'border-slate-200');
    
    if (isListView) {
      return `<div class="bg-white border ${borderStyle} rounded-lg overflow-hidden shadow-sm flex items-center group cursor-pointer hover:border-navy relative p-2" data-card-asset="${a.id}">
        <div class="mr-3 ml-2 flex-shrink-0">
          <input type="checkbox" class="asset-batch-checkbox w-4 h-4 rounded text-[#90b9d4] border-slate-300" data-asset-id="${a.id}" ${isChecked ? 'checked' : ''}>
        </div>
        <div class="w-12 h-12 flex justify-center items-center bg-slate-50 border border-slate-100 rounded relative overflow-hidden flex-shrink-0" data-use-asset="${a._i}">
          <div class="absolute inset-0 opacity-50" style="background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 10px 10px;"></div>
          <img src="${a.src}" class="max-h-full max-w-full object-contain drop-shadow-sm relative z-10">
        </div>
        <div class="flex-1 min-w-0 pl-4 pr-2">
          <div class="flex justify-between items-center mb-1">
            <h3 class="font-bold text-sm text-slate-800 truncate pr-2">${esc(a.name)}</h3>
            <span class="text-xs text-slate-500 capitalize ml-auto">${esc(assetKind(a))}</span>
          </div>
          <div class="flex flex-wrap gap-1 items-center">
            ${(a.tags?.length?a.tags:['Identité']).map(t=>`<span class="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[10px] font-semibold text-slate-500">${esc(t)}</span>`).join("")}
          </div>
        </div>
        <button class="ml-4 mr-2 min-h-0 p-1 bg-transparent ${a.favorite?'text-red-500':'text-slate-300'} hover:text-red-600 flex-shrink-0" data-fav-asset="${a._i}">
           <svg class="w-5 h-5" fill="${a.favorite?'currentColor':'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        </button>
      </div>`;
    }

    return `<div class="bg-white border ${borderStyle} rounded-xl overflow-hidden shadow-sm flex flex-col group cursor-pointer hover:border-navy relative" data-card-asset="${a.id}">
    <div class="absolute top-3 left-3 ${isChecked ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} z-20 transition-opacity">
      <input type="checkbox" class="asset-batch-checkbox w-4 h-4 rounded text-[#90b9d4] border-slate-300" data-asset-id="${a.id}" ${isChecked ? 'checked' : ''}>
    </div>
    <button class="absolute top-3 right-3 z-20 min-h-0 p-1 bg-transparent ${a.favorite?'text-red-500':'text-slate-300'} hover:text-red-600" data-fav-asset="${a._i}">
       <svg class="w-5 h-5" fill="${a.favorite?'currentColor':'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
    </button>
    
    <div class="h-32 flex justify-center items-center p-4 bg-slate-50 border-b border-slate-100 relative overflow-hidden" data-use-asset="${a._i}">
      <div class="absolute inset-0 opacity-50" style="background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0;"></div>
      <img src="${a.src}" class="max-h-full max-w-full object-contain drop-shadow-sm relative z-10">
    </div>
    
    <div class="p-4 flex-1 flex flex-col relative z-10 bg-white">
      <div class="flex justify-between items-start mb-1">
        <h3 class="font-bold text-sm text-slate-800 truncate pr-2">${esc(a.name)}</h3>
        <span class="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-bold uppercase">${String(a.src||'').includes('data:image/svg')?'SVG':'PNG'}</span>
      </div>
      
      <div class="text-xs text-slate-500 mb-3 capitalize">${esc(assetKind(a))}<br>600 × 600</div>
      
      <div class="mt-auto flex flex-wrap gap-1 items-center">
        ${(a.tags?.length?a.tags:['Identité']).map(t=>`<span class="px-2 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] font-semibold text-slate-500">${esc(t)}</span>`).join("")}
        <button class="ml-auto flex items-center justify-center w-6 h-6 min-h-0 rounded-full bg-transparent hover:bg-slate-100 text-slate-400" data-open-asset-detail="${a.id}" title="Voir les details">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
        </button>
      </div>
    </div>
  </div>`;}).join(""):`<div class="col-span-full flex flex-col items-center justify-center p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl text-slate-500"><svg class="w-12 h-12 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><h3 class="text-lg font-bold text-slate-700 mb-1">Aucun asset</h3><p class="text-sm">Importe un logo, un fond ou un picto pour commencer.</p></div>`;

  document.querySelectorAll(".asset-batch-checkbox").forEach(cb => {
    cb.onchange = (e) => {
      const id = e.target.dataset.assetId;
      if (e.target.checked) {
        if (!state.selectedAssetsForBatch.includes(id)) state.selectedAssetsForBatch.push(id);
      } else {
        state.selectedAssetsForBatch = state.selectedAssetsForBatch.filter(x => x !== id);
      }
      renderAssets();
    };
  });
  
  document.querySelectorAll("[data-use-asset]").forEach(b=>b.onclick=()=>useAsset(base[+b.dataset.useAsset]));
  document.querySelectorAll("[data-fav-asset]").forEach(b=>b.onclick=()=>apply(()=>{const a=base[+b.dataset.favAsset];const real=state.assets.find(x=>x.src===a.src&&x.name===a.name);if(real)real.favorite=!real.favorite;}));
  document.querySelectorAll("[data-tag-asset]").forEach(b=>b.onclick=()=>apply(()=>{const tag=($("assetTagInput")?.value||"").trim();if(!tag)return toast("Ajoute un tag dans le champ prévu.");const a=base[+b.dataset.tagAsset];const real=state.assets.find(x=>x.src===a.src&&x.name===a.name);if(real){real.tags=real.tags||[];if(!real.tags.includes(tag))real.tags.push(tag);}}));

  document.querySelectorAll("[data-card-asset]").forEach(card => {
    const id = card.dataset.cardAsset;
    card.onclick = (e) => {
      if (e.target.closest("button") || e.target.closest("input[type=checkbox]")) return;
      apply(() => {
        state.selectedAssetId = id;
      }, false);
    };
    card.ondblclick = () => {
      const a = list.find(x => x.id === id);
      if (a) useAsset(a);
    };
  });
  document.querySelectorAll("[data-open-asset-detail]").forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    apply(()=>{state.selectedAssetId=b.dataset.openAssetDetail;},false);
  });

  renderLibraryDetails(selectedAsset);
}

function renderLibraryDetails(selectedAsset){
  const sidebar = $("libraryDetailsSidebar");
  if (!sidebar) return;

  if (!selectedAsset) {
    sidebar.style.display = "none";
    return;
  }

  sidebar.style.display = "flex";
  
  const kind = assetKind(selectedAsset);
  const format = String(selectedAsset.src||"").includes("data:image/svg") ? "SVG" : "PNG";
  const tags = selectedAsset.tags || ["Identité"];
  const assetFolder = selectedAsset.folder || (kind === "logo" ? "Logos" : kind === "background" ? "Fonds" : "Assets");
  
  sidebar.innerHTML = `
    <!-- Header -->
    <div class="p-6 border-b border-slate-200 flex justify-between items-center bg-white shrink-0">
      <div class="flex items-center gap-2 min-w-0">
        <h3 class="font-bold text-base text-slate-800 truncate">${esc(selectedAsset.name)}</h3>
        <button id="detailFavBtn" class="shrink-0 ${selectedAsset.favorite ? 'text-yellow-400' : 'text-slate-300'} hover:text-yellow-500">
          <svg class="w-5 h-5" fill="${selectedAsset.favorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
          </svg>
        </button>
      </div>
      <button id="closeDetailBtn" class="text-slate-400 hover:text-slate-500 p-1 rounded-full hover:bg-slate-100">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Scrollable content -->
    <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <!-- Checkerboard Preview box -->
      <div>
        <div class="h-44 bg-slate-100 border border-slate-200 rounded-2xl flex justify-center items-center p-6 relative overflow-hidden">
          <div class="absolute inset-0 opacity-50" style="background-image: linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0;"></div>
          <img src="${selectedAsset.src}" class="max-h-full max-w-full object-contain drop-shadow-sm relative z-10">
        </div>
        <button id="openInStudioBtn" class="w-full mt-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-xs rounded-lg shadow-sm flex items-center justify-center gap-2">
          Ouvrir dans le studio <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </button>
      </div>

      <!-- Informations -->
      <div>
        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Informations</h4>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between py-1 border-b border-slate-100">
            <span class="text-slate-500">Type</span>
            <span class="font-semibold text-slate-700 capitalize">${esc(kind)}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-100">
            <span class="text-slate-500">Format</span>
            <span class="font-semibold text-slate-700 uppercase">${esc(format)}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-100">
            <span class="text-slate-500">Dimensions</span>
            <span class="font-semibold text-slate-700">600 × 600 px</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-100">
            <span class="text-slate-500">Taille du fichier</span>
            <span class="font-semibold text-slate-700">${selectedAsset.src.startsWith('data:') ? Math.round(selectedAsset.src.length * 0.75 / 1024) + ' Ko' : '42 Ko'}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-100">
            <span class="text-slate-500">Ajouté le</span>
            <span class="font-semibold text-slate-700">12 mai 2024</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-100">
            <span class="text-slate-500">Ajouté par</span>
            <span class="font-semibold text-slate-700">Vous</span>
          </div>
        </div>
      </div>

      <!-- Tags -->
      <div>
        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Tags</h4>
        <div class="flex flex-wrap gap-1.5 items-center">
          ${tags.map(t => `<span class="px-2 py-1 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs font-semibold">${esc(t)}</span>`).join("")}
          <button id="addDetailTagBtn" class="w-7 h-7 flex items-center justify-center bg-white border border-slate-200 text-slate-500 rounded-full text-base font-light hover:bg-slate-50 hover:border-slate-300">+</button>
        </div>
      </div>

      <!-- Dossier -->
      <div>
        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Dossier</h4>
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2 font-medium text-slate-700">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            / ${esc(assetFolder)}
          </div>
          <button id="changeFolderBtn" class="text-[#90b9d4] font-semibold hover:underline">Modifier</button>
        </div>
      </div>

      <!-- Utilisé dans -->
      <div>
        <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Utilisé dans</h4>
        <div class="flex items-center justify-between text-xs">
          <span class="font-medium text-slate-700">7 modèles</span>
          <button id="viewUsedBtn" class="text-[#90b9d4] font-semibold hover:underline">Voir</button>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-4 pt-4 border-t border-slate-200 space-y-2">
        <button id="replaceAssetBtn" class="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          Remplacer
        </button>
        <button id="duplicateAssetBtn" class="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
          Dupliquer
        </button>
        <button id="moveAssetBtn" class="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
          Déplacer
        </button>
        <button id="deleteAssetBtn" class="w-full py-2.5 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 text-red-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          Supprimer l'asset
        </button>
      </div>
    </div>
  `;

  // Bind actions
  $("detailFavBtn").onclick = () => {
    apply(() => {
      if (selectedAsset.id === "current-logo") {
        toast("Le logo actif est déjà un favori d'usage.");
      } else if (selectedAsset.id === "current-bg") {
        toast("Le fond actif est déjà un favori d'usage.");
      } else {
        const real = state.assets.find(x => x.id === selectedAsset.id || (x.src === selectedAsset.src && x.name === selectedAsset.name));
        if (real) {
          real.favorite = !real.favorite;
          selectedAsset.favorite = real.favorite;
        }
      }
    });
  };

  $("closeDetailBtn").onclick = () => {
    apply(() => {
      state.selectedAssetId = "";
    }, false);
    sidebar.style.display = "none";
  };

  $("openInStudioBtn").onclick = () => {
    const asset = selectedAsset;
    if(!asset || !asset.src) return toast("Aucun asset image a ouvrir.");
    const before = studioPage().objects.length;
    addStudioImage(asset.src, asset.name || "asset");
    showView("studio");
    if(studioPage().objects.length > before) toast("Asset ajoute au Studio.");
  };

  $("addDetailTagBtn").onclick = () => {
    const tag = prompt("Entrez le nom du tag :");
    if (tag && tag.trim()) {
      apply(() => {
        if (selectedAsset.id === "current-logo") {
          state.logo.tags = state.logo.tags || [];
          if (!state.logo.tags.includes(tag.trim())) state.logo.tags.push(tag.trim());
        } else if (selectedAsset.id === "current-bg") {
          state.background.tags = state.background.tags || [];
          if (!state.background.tags.includes(tag.trim())) state.background.tags.push(tag.trim());
        } else {
          const real = state.assets.find(x => x.id === selectedAsset.id);
          if (real) {
            real.tags = real.tags || [];
            if (!real.tags.includes(tag.trim())) real.tags.push(tag.trim());
          }
        }
      });
      toast("Tag ajouté.");
    }
  };

  $("changeFolderBtn").onclick = () => {
    const folder = prompt("Nouveau dossier :", assetFolder);
    if(!folder || !folder.trim()) return;
    const nextFolder = folder.trim().slice(0, 60);
    apply(() => {
      selectedAsset.folder = nextFolder;
      if (selectedAsset.id === "current-logo") {
        state.logo.folder = nextFolder;
      } else if (selectedAsset.id === "current-bg") {
        state.background.folder = nextFolder;
      } else {
        const real = state.assets.find(x => x.id === selectedAsset.id || (x.src === selectedAsset.src && x.name === selectedAsset.name));
        if (real) real.folder = nextFolder;
      }
    }, true, "Dossier asset");
    renderAssets();
    syncDocumentStatePill();
    toast("Dossier mis a jour.");
  };

  $("viewUsedBtn").onclick = () => {
    toast("Cet asset est utilisé dans les modèles Signature RAGT et RAGT Compact.");
  };

  $("replaceAssetBtn").onclick = () => {
    if (selectedAsset.id === "current-logo") {
      $("logoInput").click();
    } else if (selectedAsset.id === "current-bg") {
      $("bgInput").click();
    } else {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*,.svg";
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            apply(() => {
              const real = state.assets.find(x => x.id === selectedAsset.id);
              if (real) {
                real.src = reader.result;
                real.name = file.name;
              }
            });
            toast("Asset remplacé avec succès !");
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
  };

  $("duplicateAssetBtn").onclick = () => {
    apply(() => {
      const copy = { ...selectedAsset, id: "asset-" + Date.now(), name: selectedAsset.name + " (Copie)" };
      delete copy._i; // remove mapped index
      state.assets.unshift(copy);
      state.selectedAssetId = copy.id;
    });
    toast("Asset dupliqué.");
  };

  $("moveAssetBtn").onclick = () => {
    const folder = prompt("Deplacer vers le dossier :", selectedAsset.folder || assetFolder || "General");
    if(!folder || !folder.trim()) return;
    const nextFolder = folder.trim().slice(0, 60);
    apply(() => {
      selectedAsset.folder = nextFolder;
      if (selectedAsset.id === "current-logo") {
        state.logo.folder = nextFolder;
      } else if (selectedAsset.id === "current-bg") {
        state.background.folder = nextFolder;
      } else {
        const real = state.assets.find(x => x.id === selectedAsset.id || (x.src === selectedAsset.src && x.name === selectedAsset.name));
        if (real) real.folder = nextFolder;
      }
    }, true, "Deplacement asset");
    renderAssets();
    toast("Asset deplace vers " + nextFolder + ".");
  };

  $("deleteAssetBtn").onclick = () => {
    if (confirm("Voulez-vous vraiment supprimer cet asset de la bibliothèque ?")) {
      if (selectedAsset.id === "current-logo") {
        apply(() => { state.logo.src = ""; state.logo.name = ""; state.selectedAssetId = ""; });
        toast("Logo supprimé.");
      } else if (selectedAsset.id === "current-bg") {
        apply(() => { state.background.src = ""; state.background.name = ""; state.selectedAssetId = ""; });
        toast("Fond supprimé.");
      } else {
        apply(() => {
          state.assets = state.assets.filter(x => x.id !== selectedAsset.id);
          state.selectedAssetId = "";
        });
        toast("Asset supprimé.");
      }
    }
  };
}
function useAsset(a){
  if(!a) return;
  apply(()=>{
    const kind=assetKind(a);
    if(kind==="background"){state.background.src=a.src;state.background.name=a.name;}
    else if(kind==="icon"){state.design.customIcons=state.design.customIcons||{};state.design.customIcons.email=a.src;}
    else {state.logo.src=a.src;state.logo.name=a.name;state.selectedLayer="logo";}
  });
}
function layerName(k){
  const b=state.blocks[k]||{};
  if(k==="logo") return "logo";
  if(k==="text") return "texte";
  if(k==="socials") return "réseaux";
  return b.label||k;
}
function renderLayers(){
  const keys=state.blockOrder.filter(k=>state.blocks[k]).sort((a,b)=>(state.blocks[b].z||0)-(state.blocks[a].z||0));
  const html=keys.map((k,i)=>{const b=state.blocks[k];return `<div class="layer ${state.selectedLayer===k?"active":""} ${!b.visible?"hidden":""} ${b.locked?"locked":""}">
    <div><strong><span class="layer-order-chip">${i+1}</span>${layerName(k)}</strong><span>${b.locked?"verrouillé":b.visible?"visible":"masqué"} · z ${b.z||0}</span></div>
    <div class="layer-actions"><button data-layer="${k}" class="ghost">OK</button><button data-eye="${k}" class="ghost">${b.visible?"Masq.":"Voir"}</button><button data-lock="${k}" class="ghost">${b.locked?"Dév.":"Verr."}</button></div>
  </div>`;}).join("");
  $("layerList").innerHTML=html;
  $("layerListLarge").innerHTML=html;
  if($("blockManagerList")) $("blockManagerList").innerHTML=keys.map((k,i)=>{const b=state.blocks[k];return `<div class="block-manager-card ${state.selectedLayer===k?"active":""}">
    <div><strong>${layerName(k)}</strong><span>Position ${b.x}, ${b.y} · Taille ${b.w}×${b.h} · z ${b.z||0}</span></div>
    <div class="block-manager-actions"><button data-layer="${k}">Sélection</button><button data-dup-block="${k}" class="secondary">Dupliquer</button><button data-del-block="${k}" class="danger">Suppr.</button></div>
  </div>`;}).join("");
  document.querySelectorAll("[data-layer]").forEach(b=>b.onclick=()=>apply(()=>state.selectedLayer=b.dataset.layer,false));
  document.querySelectorAll("[data-eye]").forEach(b=>b.onclick=()=>apply(()=>state.blocks[b.dataset.eye].visible=!state.blocks[b.dataset.eye].visible));
  document.querySelectorAll("[data-lock]").forEach(b=>b.onclick=()=>apply(()=>state.blocks[b.dataset.lock].locked=!state.blocks[b.dataset.lock].locked));
  document.querySelectorAll("[data-dup-block]").forEach(b=>b.onclick=()=>duplicateBlock(b.dataset.dupBlock));
  document.querySelectorAll("[data-del-block]").forEach(b=>b.onclick=()=>deleteBlock(b.dataset.delBlock));
  syncProps();
}
function syncProps(){
  const k=state.selectedLayer,b=state.blocks[k]||state.blocks.logo;
  $("selectedLayerName").value=k;
  $("blockX").value=b.x;$("blockY").value=b.y;$("blockW").value=b.w;$("blockH").value=b.h;
  $("logoOpacity").value=state.logo.opacity;$("logoSize").value=state.logo.size;
  $("logoOpacityLabel").textContent=state.logo.opacity;$("logoSizeLabel").textContent=state.logo.size+"px";
}
function syncForm(){
  Object.keys(state.identity).forEach(k=>{if($(k))$(k).value=state.identity[k]||""});
  $("documentType").value=state.documentType;$("layout").value=state.design.layout;
  $("canvasWidth").value=state.canvas.width;$("canvasHeight").value=state.canvas.height;
  ["bgStyle","motif","bg1","bg2","fg","accent"].forEach(k=>$(k).value=state.design[k]);
  $("motifOpacity").value=state.design.motifOpacity;$("radius").value=state.canvas.radius;
  $("previewFit").value=state.preferences.previewFit;$("emailMode").value=state.preferences.emailMode;$("zoom").value=state.preferences.zoom;
  if($("appTheme")) $("appTheme").value=state.preferences.appTheme;
  document.documentElement.setAttribute("data-theme", state.preferences.appTheme);
  document.querySelectorAll(".theme-swatch").forEach(btn => {
    const isActive = btn.dataset.themeValue === state.preferences.appTheme;
    btn.classList.toggle("ring-2", isActive);
    btn.classList.toggle("ring-offset-2", isActive);
    btn.classList.toggle("ring-blue-500", isActive);
  });
  $("editMode").checked=state.preferences.editMode;
  if($("globalDarkMode")) {
    $("globalDarkMode").checked = !!state.preferences.globalDarkMode;
    document.body.classList.toggle("dark-mode", !!state.preferences.globalDarkMode);
  }
  if($("brandLock")) $("brandLock").checked=state.bulkSettings.brandLock;
  if($("requireFields")) $("requireFields").checked=state.bulkSettings.requiredFields;
  $("darkPreview").checked=state.preferences.darkPreview;$("autoSave").checked=state.preferences.autoSave;
  document.body.classList.toggle("brand-locked",!!state.bulkSettings.brandLock);
  $("motifOpacityLabel").textContent=state.design.motifOpacity;$("radiusLabel").textContent=state.canvas.radius+"px";$("zoomLabel").textContent=state.preferences.zoom;
  syncProps();
}
function diagnostic(){
  const html=getEmailHtml(); const ko=(new Blob([html]).size/1024).toFixed(1);
  const imgs=(state.logo.src?1:0)+(state.background.src?1:0)+state.assets.length;
  $("diagnostic").innerHTML=`<strong>Diagnostic</strong><br>Format : ${state.canvas.width}×${state.canvas.height}px<br>Poids HTML : ${ko} Ko<br>Images : ${imgs}<br>Mode : ${state.preferences.emailMode}<br>Conseil : PNG pour les signatures très graphiques.`;
  if(!$("documentPreviewBody") || $("documentPreviewBody").hidden){
    $("previewStatus").textContent=`${state.canvas.width}×${state.canvas.height}`;
  }
  $("weightStatus").textContent=`HTML ${ko} Ko`;
  $("compatStatus").textContent=state.canvas.width>900?"Grand format : PNG conseillé":"HTML OK";
}
function renderSettingsDocumentProperties(){
  if(!$('settingsDocumentSummary'))return;
  const html=getEmailHtml();
  const ko=(new Blob([html]).size/1024).toFixed(1);
  const imgs=(state.logo.src?1:0)+(state.background.src?1:0)+(state.assets?.length||0);
  const dirty=!!state.ux?.documentDirty;
  const modifiedAt=state.ux?.lastModifiedAt?new Date(state.ux.lastModifiedAt):null;
  const modifiedText=modifiedAt&&!Number.isNaN(modifiedAt.getTime())?modifiedAt.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}):'aucune modification';
  const q=qualityReportData();
  const idFields=['firstName','lastName','jobTitle','email','phone'];
  const identityScore=Math.round(idFields.filter(f=>!!state.identity[f]).length/idFields.length*100);
  const layers=state.blockOrder.filter(k=>state.blocks[k]);
  const visibleLayers=layers.filter(k=>state.blocks[k]?.visible).length;
  const rows=[
    ['Etat',dirty?'Modifie':'Synchronise'],
    ['Derniere modification',dirty?modifiedText+' - '+(state.ux.lastModifiedLabel||'Modification'):'Sauvegarde'],
    ['Format',state.canvas.width+'x'+state.canvas.height+'px'],
    ['Type',state.documentType||'signature'],
    ['Mode email',state.preferences.emailMode||'outlook'],
    ['Poids HTML',ko+' Ko'],
    ['Images',String(imgs)],
    ['Logo',state.logo.src?(state.logo.name||'logo actif'):'manquant'],
    ['Calques',visibleLayers+'/'+layers.length+' visibles'],
    ['Charte',state.bulkSettings.brandLock?'verrouillee':'libre'],
    ['Auto-save',state.preferences.autoSave?'actif':'desactive']
  ];
  $('settingsDocumentSummary').innerHTML=rows.map(([k,v])=>'<div class="settings-doc-row"><span>'+esc(k)+'</span><strong>'+esc(v)+'</strong></div>').join('');
  if($('settingsDirtyBadge')){
    $('settingsDirtyBadge').textContent=dirty?'Document modifie':'Document synchronise';
    $('settingsDirtyBadge').classList.toggle('is-dirty',dirty);
  }
  if($('settingsDocumentState')){
    $('settingsDocumentState').textContent=dirty?'Modifie':'Stable';
    $('settingsDocumentState').classList.toggle('is-dirty',dirty);
  }
  $('settingsDocumentProps')?.classList.toggle('has-changes',dirty);
  if($('settingsDocumentHealth')){
    const health=[
      ['Qualite',q.score+'%'],
      ['Identite',identityScore+'%'],
      ['Alertes',String(q.warnings.length)],
      ['Assets',String((state.assets?.length||0)+(state.logo.src?1:0)+(state.background.src?1:0))]
    ];
    $('settingsDocumentHealth').innerHTML=health.map(([k,v])=>'<div class="settings-health-card"><span>'+esc(k)+'</span><strong>'+esc(v)+'</strong></div>').join('');
  }
  if($('settingsDocumentIssues')){
    const blocking=(q.issues||[]).map(x=>({kind:'warn',text:x}));
    const warnings=(q.warnings||[]).slice(0,6).map(x=>({kind:'warn',text:x}));
    const items=[...blocking,...warnings];
    $('settingsDocumentIssues').innerHTML=items.length?items.map(item=>'<div class="settings-issue '+item.kind+'">'+esc(item.text)+'</div>').join(''):'<div class="settings-issue ok">Aucun point bloquant detecte.</div>';
  }
  if($('settingsDocumentChanges')){
    const changes=(historyLog||[]).slice(-5).reverse();
    $('settingsDocumentChanges').innerHTML=changes.length?changes.map(x=>'<div class="settings-change"><strong>'+esc(x.label||'Modification')+'</strong><span>'+new Date(x.time||Date.now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})+'</span></div>').join(''):'<div class="settings-change"><strong>Aucune modification enregistree</strong><span>Les actions apparaitront ici.</span></div>';
  }
  syncDocumentStatePill();
}
function syncDocumentStatePill(){
  const pill=$('documentStatePill');
  if(!pill)return;
  const dirty=!!state.ux?.documentDirty;
  pill.hidden=!dirty;
  if(!dirty)return;
  const modifiedAt=state.ux?.lastModifiedAt?new Date(state.ux.lastModifiedAt):null;
  const modifiedText=modifiedAt&&!Number.isNaN(modifiedAt.getTime())?modifiedAt.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}):'maintenant';
  const label=state.ux?.lastModifiedLabel||'Modification';
  if($('documentStateTitle'))$('documentStateTitle').textContent='Document modifie';
  if($('documentStateMeta'))$('documentStateMeta').textContent=label+' - '+modifiedText;
  pill.onclick=()=>{
    showView('settings');
    setTimeout(()=>$('settingsDocumentProps')?.scrollIntoView({block:'nearest',behavior:'smooth'}),40);
  };
}
const RAGT_CHARTER = {
  colors: ["#273540", "#ecc764", "#ffe37a", "#ffffff", "#90b9d4"],
  typography: ["Arial", "Inter", "Space Grotesk"],
  resources: [
    { name: "Logo corporate", role: "logo", folder: "Charte officielle", tags: ["logo", "ragt", "officiel"], src: localAssetPreview({name:"Logo corporate", role:"logo", tags:["logo"]}) },
    { name: "Palette corporate", role: "palette", folder: "Charte officielle", tags: ["couleur", "charte", "officiel"], src: localAssetPreview({name:"Palette RAGT", role:"palette", tags:["couleur"]}) },
    { name: "Typographie", role: "font", folder: "Charte officielle", tags: ["typo", "charte"], src: localAssetPreview({name:"Typographie", role:"icon", tags:["typo"]}) }
  ]
};
function bindCharter(){
  if($("charterApplyPaletteBtn")) $("charterApplyPaletteBtn").onclick=()=>{
    apply(()=>{
      state.design.bgStyle="softGradient";
      state.design.bg1=RAGT_CHARTER.colors[1];
      state.design.bg2=RAGT_CHARTER.colors[2];
      state.design.fg=RAGT_CHARTER.colors[0];
      state.design.accent=RAGT_CHARTER.colors[3];
      state.design.templateId="ragt-corporate";
    }, true, "Charte : palette RAGT");
    toast("Palette RAGT appliquee au document.");
  };
  if($("charterCopyPaletteBtn")) $("charterCopyPaletteBtn").onclick=()=>{
    copyToClipboard(RAGT_CHARTER.colors.join("\n"));
    toast("Palette copiee dans le presse-papiers.");
  };
  if($("charterExportBtn")) $("charterExportBtn").onclick=()=>{
    const payload={
      name:"Charte graphique RAGT",
      exportedAt:new Date().toISOString(),
      colors:RAGT_CHARTER.colors,
      typography:RAGT_CHARTER.typography,
      currentDesign:clone(state.design),
      logo:{name:state.logo.name||"",hasLogo:!!state.logo.src},
      quality:qualityReportData()
    };
    download("charte-graphique-ragt.json", JSON.stringify(payload,null,2), "application/json");
    toast("Charte exportee.");
  };
  if($("charterOpenLogosBtn")) $("charterOpenLogosBtn").onclick=()=>{
    apply(()=>{
      RAGT_CHARTER.resources.forEach(resource=>{
        const exists=state.assets.some(a=>a.name===resource.name && a.folder===resource.folder);
        if(!exists) state.assets.unshift({id:"charter_"+Date.now()+"_"+Math.floor(Math.random()*9999), favorite:true, ...resource});
      });
    }, true, "Charte : ressources officielles");
    showView("library");
    renderAssets();
    toast("Ressources de charte ajoutees a la bibliotheque.");
  };
  if($("charterQualityBtn")) $("charterQualityBtn").onclick=()=>{
    showView("quality");
    setTimeout(()=>showQualityReport(),40);
  };
}
function bindSettingsPanel(){
  document.querySelectorAll('[data-settings-view]').forEach(btn=>btn.onclick=e=>{
    e.preventDefault();
    const view=btn.dataset.settingsView;
    if(view)showView(view);
  });
  document.querySelectorAll('[data-settings-action]').forEach(btn=>btn.onclick=e=>{
    e.preventDefault();
    const action=btn.dataset.settingsAction;
    const map={
      'new-project':'newProjectBtn',
      'open-project':'openProjectBtn',
      'save-project':'saveProjectBtn',
      'export-state':'exportAppStateBtn',
      'quality':'qualityBtn',
      'simple-mode':'simpleModeBtn',
      'compact-ui':'compactUiBtn',
      'reset-cache':'resetCacheBtn'
    };
    const targetId=map[action];
    if(targetId && $(targetId)){ $(targetId).click(); return; }
    toast('Action parametres indisponible.');
  });
}

function showHomePreviewModal() {
  document.querySelector("#homePreviewModal")?.remove();
  const m = document.createElement("div");
  m.id = "homePreviewModal";
  m.className = "fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in";
  
  const html = getEmailHtml();
  
  m.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl p-6 max-w-2xl w-full border border-slate-100 flex flex-col gap-6 transform transition-all scale-95 duration-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-bold text-[#273540]">Aperçu de votre signature RAGT</h3>
          <p class="text-xs text-slate-500">Prête pour intégration Outlook, Gmail, Teams</p>
        </div>
        <button id="closeHomePreviewModal" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 overflow-auto max-h-[300px] flex items-center justify-center">
        <div class="bg-white shadow-sm rounded-xl p-4 border border-slate-200/50 scale-90 origin-center">
          ${html}
        </div>
      </div>
      
      <div class="bg-amber-50 text-amber-800 rounded-xl p-3 border border-amber-100 flex gap-3 text-xs">
        <svg class="w-5 h-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          Pour insérer dans Outlook, cliquez sur <strong>Copier la signature</strong> puis collez (<kbd class="bg-white px-1 border rounded text-[10px] font-mono">Ctrl+V</kbd>) dans les paramètres de signature d'Outlook.
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-center gap-3 justify-end pt-2 border-t border-slate-100">
        <button id="homePreviewEditBtn" class="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#273540] font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          Éditer le design
        </button>
        <button id="homePreviewCopyBtn" class="w-full sm:w-auto px-5 py-2.5 bg-[#ecc764] hover:bg-[#ecc764]/90 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
          Copier la signature
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(m);
  
  setTimeout(() => {
    m.querySelector(".transform").classList.remove("scale-95");
    m.querySelector(".transform").classList.add("scale-100");
  }, 10);
  
  const close = () => {
    m.querySelector(".transform").classList.remove("scale-100");
    m.querySelector(".transform").classList.add("scale-95");
    m.classList.add("opacity-0");
    setTimeout(() => m.remove(), 200);
  };
  
  m.querySelector("#closeHomePreviewModal").onclick = close;
  m.onclick = (e) => { if(e.target === m) close(); };
  
  m.querySelector("#homePreviewEditBtn").onclick = () => {
    close();
    showView("appearance");
  };
  
  m.querySelector("#homePreviewCopyBtn").onclick = async () => {
    await copyHtml();
    close();
  };
}

function ensureHomeDashboard(){
  const home = $("home");
  const template = $("homeDashboardTemplate");
  if(!home || !template) return;
  if(home.dataset.homeDashboard === "v49") return;
  home.innerHTML = template.innerHTML.trim();
  home.dataset.homeDashboard = "v49";
}

function bindHomeDashboardControls(){
  const home = $("home");
  if(!home || home.dataset.homeBindings === "v49") return;
  home.dataset.homeBindings = "v49";
  const card = () => $("currentProjectCard");

  if($("homePreviewBtn")) $("homePreviewBtn").onclick = () => showHomePreviewModal();
  if($("importProjectBtnDirect")) $("importProjectBtnDirect").onclick = () => { if($("openProjectInput")) $("openProjectInput").click(); };

  const setProjectView = mode => {
    ["viewGridBtn","viewListBtn","viewCalendarBtn"].forEach(id => $(id)?.classList.remove("active"));
    const activeId = mode === "list" ? "viewListBtn" : mode === "calendar" ? "viewCalendarBtn" : "viewGridBtn";
    $(activeId)?.classList.add("active");
    document.querySelectorAll(".project-card-content").forEach(content => {
      content.classList.toggle("is-list", mode !== "grid");
    });
    const container = $("projectsContainer");
    if(container) container.classList.toggle("is-timeline", mode === "calendar");
  };
  if($("viewGridBtn")) $("viewGridBtn").onclick = () => setProjectView("grid");
  if($("viewListBtn")) $("viewListBtn").onclick = () => setProjectView("list");
  if($("viewCalendarBtn")) $("viewCalendarBtn").onclick = () => setProjectView("calendar");

  if($("projectSearchInput")) $("projectSearchInput").oninput = e => {
    const current = card();
    if(!current) return;
    const q = (e.target.value || "").trim().toLowerCase();
    const title = (state.name || "signature email ragt").toLowerCase();
    current.style.display = title.includes(q) ? "" : "none";
  };

  if($("projectStatusFilter")) $("projectStatusFilter").onchange = e => {
    const current = card();
    if(!current) return;
    const val = e.target.value;
    const isFav = localStorage.getItem("currentProjectFavorite") === "true";
    const isArchived = localStorage.getItem("currentProjectArchived") === "true";
    let show = true;
    if(val === "favorite" && !isFav) show = false;
    if(val === "archived" && !isArchived) show = false;
    if(val !== "archived" && isArchived) show = false;
    if(val === "all") show = !isArchived;
    current.style.display = show ? "" : "none";
  };

  if($("createFolderBtn")) $("createFolderBtn").onclick = () => {
    const folderName = prompt("Nom du nouveau dossier :");
    if(!folderName || !folderName.trim()) return;
    const current = card();
    if(current && !$("foldersContainer")){
      const folders = document.createElement("div");
      folders.id = "foldersContainer";
      folders.className = "home-folders-row";
      current.parentNode.insertBefore(folders, current);
    }
    if($("foldersContainer")){
      const btn = document.createElement("button");
      btn.className = "home-folder-chip";
      btn.textContent = folderName.trim();
      btn.addEventListener("dragover", e => { e.preventDefault(); btn.classList.add("is-drop"); });
      btn.addEventListener("dragleave", () => btn.classList.remove("is-drop"));
      btn.addEventListener("drop", e => { e.preventDefault(); btn.classList.remove("is-drop"); toast("Projet deplace dans " + folderName.trim()); });
      $("foldersContainer").appendChild(btn);
    }
    toast("Dossier cree : " + folderName.trim());
  };

  if($("quickTagsBtn")) $("quickTagsBtn").onclick = e => {
    e.preventDefault();
    let tags = Array.isArray(state.tags) ? state.tags.slice() : [];
    let nextTag = "Urgent";
    if(tags.includes("Urgent")){ tags = tags.filter(t => t !== "Urgent"); nextTag = "A reviser"; }
    else if(tags.includes("A reviser")){ tags = tags.filter(t => t !== "A reviser"); nextTag = "Client"; }
    else if(tags.includes("Client")){ tags = tags.filter(t => t !== "Client"); nextTag = null; }
    if(nextTag) tags.push(nextTag);
    apply(() => { state.tags = tags; }, false);
    const label = $("quickTagsBtn")?.querySelector("span");
    if(label) label.textContent = nextTag ? "Tag : " + nextTag : "Tags rapides";
    toast(nextTag ? "Tag rapide assigne : " + nextTag : "Tags rapides retires.");
  };

  if($("exportCsvBtn")) $("exportCsvBtn").onclick = e => {
    e.preventDefault();
    const escCsv = value => '"' + String(value ?? "").replace(/"/g, '""') + '"';
    const row = [state.name || "Nouveau projet", "En cours", new Date().toLocaleDateString("fr-FR"), (state.tags || []).join(" | "), state.design?.templateId || "default"].map(escCsv).join(",");
    download("projets_recents.csv", "Nom,Statut,Derniere modification,Tags,Modele\n" + row, "text/csv;charset=utf-8");
    toast("Liste des projets exportee en CSV.");
  };

  if($("quickExportPngBtn")) $("quickExportPngBtn").onclick = e => {
    e.preventDefault();
    exportImage("png");
    toast("Image exportee en PNG.");
  };

  if($("exportSummaryPdfBtn")) $("exportSummaryPdfBtn").onclick = e => {
    e.preventDefault();
    exportHomeSummaryPdf();
  };

  const dueDateInput = $("projectDueDate");
  const countdown = $("projectCountdown");
  if(dueDateInput && countdown) dueDateInput.onchange = e => {
    const selected = new Date(e.target.value);
    if(isNaN(selected.getTime())){ state.dueDate = null; countdown.classList.add("hidden"); return; }
    state.dueDate = selected.toISOString();
    const diff = selected.getTime() - Date.now();
    const days = Math.ceil(diff / 86400000);
    countdown.textContent = days >= 0 ? "J-" + days : "En retard";
    countdown.classList.remove("hidden");
  };

  const current = card();
  if(current){
    current.addEventListener("dragstart", e => {
      e.dataTransfer?.setData("text/plain", state.name || "Projet");
      current.style.opacity = "0.55";
    });
    current.addEventListener("dragend", () => { current.style.opacity = "1"; });
  }
}

function renderHomeQualityChart(score) {
  const container = $("homeQualityChart");
  if (!container) return;
  container.innerHTML = "";

  const width = 56;
  const height = 56;
  const margin = 2;
  const radius = Math.min(width, height) / 2 - margin;

  const svg = d3.select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#f97316" : "#ef4444";
  const backgroundColor = "#f1f5f9";

  const arc = d3.arc()
    .innerRadius(radius - 6)
    .outerRadius(radius)
    .cornerRadius(4)
    .startAngle(0);

  // Background arc
  svg.append("path")
    .datum({endAngle: 2 * Math.PI})
    .style("fill", backgroundColor)
    .attr("d", arc);

  // Foreground arc
  svg.append("path")
    .datum({endAngle: (score / 100) * 2 * Math.PI})
    .style("fill", color)
    .attr("d", arc);

  // Text
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .style("fill", color)
    .text(score);
}

function renderHomeStatsDashboard() {
  const root = $("stats-dashboard-root");
  if (!root) return;
  const q = qualityReportData();
  const identityFields = ["firstName", "lastName", "jobTitle", "email", "phone"];
  const identityScore = Math.round(identityFields.filter(f => !!state.identity[f]).length / identityFields.length * 100);
  const assetsCount = libraryBaseAssets().length;
  const docCount = state.documents?.length || 0;
  const week = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => ({
    day,
    value: Math.max(4, Math.round((Math.min(100, identityScore + q.score)) / 12) + index * 2 + (index === 4 ? 8 : 0))
  }));
  const max = Math.max(...week.map(d => d.value), 1);
  const month = new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const today = new Date().getDate();
  const cells = Array.from({ length: 30 }, (_, i) => i + 1);

  root.innerHTML = `
    <div class="flex flex-col gap-4">
      <div class="bg-white p-2">
        <div class="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 class="text-sm font-bold text-slate-800">Activit�</h3>
            <p class="text-xs text-slate-500 mt-1">${esc(state.name || "Signature email RAGT")} · synthese locale</p>
          </div>
          <button data-home-stats-jump="quality" class="px-3 py-2 bg-[#f0fdf4] border border-[#bcf0da] text-[#6ba56f] rounded-xl text-xs font-bold">Qualite ${q.score}%</button>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <button data-home-stats-jump="appearance" class="text-left bg-slate-50 border border-slate-100 rounded-xl p-3">
            <span class="block text-[10px] uppercase font-bold text-slate-400">Identite</span>
            <strong class="block text-xl text-[#273540] mt-1">${identityScore}%</strong>
          </button>
          <button data-home-stats-jump="library" class="text-left bg-slate-50 border border-slate-100 rounded-xl p-3">
            <span class="block text-[10px] uppercase font-bold text-slate-400">Assets</span>
            <strong class="block text-xl text-[#273540] mt-1">${assetsCount}</strong>
          </button>
          <button data-home-stats-jump="documents" class="text-left bg-slate-50 border border-slate-100 rounded-xl p-3">
            <span class="block text-[10px] uppercase font-bold text-slate-400">Documents</span>
            <strong class="block text-xl text-[#273540] mt-1">${docCount}</strong>
          </button>
          <button data-home-stats-jump="studio" class="text-left bg-slate-50 border border-slate-100 rounded-xl p-3">
            <span class="block text-[10px] uppercase font-bold text-slate-400">Pages Studio</span>
            <strong class="block text-xl text-[#273540] mt-1">${state.studio?.pages?.length || 1}</strong>
          </button>
        </div>
        <div class="h-32 flex items-end gap-2 border-t border-slate-100 pt-3">
          ${week.map(d => `
            <div class="flex-1 h-full flex flex-col justify-end items-center gap-2">
              <div class="w-full max-w-9 rounded-t-xl bg-[#90b9d4]" style="height:${Math.max(12, Math.round(d.value / max * 100))}%"></div>
              <span class="text-[10px] font-bold text-slate-400">${d.day}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="bg-white p-2">
        <div class="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 class="text-sm font-bold text-slate-800">Echeances</h3>
            <p class="text-xs text-slate-500 capitalize mt-1">${esc(month)}</p>
          </div>
          <button data-home-stats-jump="settings" class="px-3 py-2 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl text-xs font-bold">Regler</button>
        </div>
        <div class="grid grid-cols-7 gap-1 text-center mb-2">
          ${["L","M","M","J","V","S","D"].map(d => `<span class="text-[10px] font-bold text-slate-400">${d}</span>`).join("")}
        </div>
        <div class="grid grid-cols-7 gap-1 text-center">
          ${cells.map(day => {
            const urgent = day === today + 1 || day === today + 3;
            const cls = day === today ? "bg-navy text-white" : urgent ? "bg-red-50 text-red-600 border border-red-100" : "bg-slate-50 text-slate-600";
            return `<span class="${cls} rounded-lg py-1.5 text-xs font-bold">${day}</span>`;
          }).join("")}
        </div>
        <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <span>Points rouges = action proche</span>
          <button data-home-stats-jump="export" class="text-[#90b9d4] font-bold">Exporter</button>
        </div>
      </div>
    </div>`;
  root.querySelectorAll("[data-home-stats-jump]").forEach(btn => {
    btn.onclick = () => showView(btn.dataset.homeStatsJump);
  });
}

function renderHome() {
  ensureHomeDashboard();
  bindHomeDashboardControls();
  if (!$("home")) return;

  const idFields = ["firstName", "lastName", "jobTitle", "email", "phone"];
  const filledIdFields = idFields.filter(f => !!state.identity[f]).length;
  const idCompleteness = Math.round((filledIdFields / idFields.length) * 100);
  if ($("homeMetricIdentity")) $("homeMetricIdentity").textContent = idCompleteness + " %";
  if ($("homeMetricIdentity")) $("homeMetricIdentity").style.color = "#6ba56f";

  const hasLogo = !!state.logo.src;
  if ($("homeMetricLogo")) {
    if (hasLogo) {
      $("homeMetricLogo").textContent = "Présent";
      $("homeMetricLogo").className = "font-bold text-sm mb-1";
      $("homeMetricLogo").style.color = "#6ba56f";
    } else {
      $("homeMetricLogo").textContent = "manquant";
      $("homeMetricLogo").className = "font-bold text-sm mb-1";
      $("homeMetricLogo").style.color = "#deaa3f";
    }
  }

  const ragtColors = ["#273540", "#90b9d4", "#ecc764", "#6ba56f", "#98af5f"];
  const isRagtColors = ragtColors.includes(state.design.bg1) || ragtColors.includes(state.design.accent);
  if ($("homeMetricDesign")) {
    $("homeMetricDesign").textContent = isRagtColors ? "Conforme" : "Personnalisé";
    $("homeMetricDesign").className = "font-bold text-sm mb-1";
    $("homeMetricDesign").style.color = isRagtColors ? "#6ba56f" : "#90b9d4";
  }

  const docCount = state.documents ? state.documents.length : 0;
  if ($("homeMetricDocuments")) {
    $("homeMetricDocuments").textContent = docCount + (docCount > 1 ? " fichiers" : " fichier");
    $("homeMetricDocuments").style.color = "#90b9d4";
  }

  const q = qualityReportData();
  if ($("homeMetricQuality")) {
    $("homeMetricQuality").textContent = q.score + " %";
    $("homeMetricQuality").style.color = "#6ba56f";
  }

  if ($("homeQualityChart")) {
    renderHomeQualityChart(q.score);
  }
  renderHomeStatsDashboard();
  if ($("homeWidgetQualityText")) $("homeWidgetQualityText").textContent = q.score + " %";
  if ($("homeWidgetQualitySub")) {
    $("homeWidgetQualitySub").textContent = q.score >= 80 ? "Excellent" : q.score >= 50 ? "Moyen" : "À améliorer";
    $("homeWidgetQualitySub").className = "text-xs font-bold";
    $("homeWidgetQualitySub").style.color = q.score >= 80 ? "#6ba56f" : q.score >= 50 ? "#deaa3f" : "#cf2e2e";
  }

  if ($("homeWidgetSaveTime")) {
    const d = new Date();
    $("homeWidgetSaveTime").textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  if ($("homeWidgetModeText")) $("homeWidgetModeText").textContent = state.ux.simpleMode ? "Simple" : "Normal";
  if ($("homeWidgetModeSub")) $("homeWidgetModeSub").textContent = state.ux.simpleMode ? "Mode restreint" : "Tous les outils";

  if ($("homeChecklist")) {
    const checklist = [
      {
        text: "Compléter l'identité",
        valid: idCompleteness >= 80,
        jump: "appearance",
        label: idCompleteness >= 80 ? "Validé" : "À faire"
      },
      {
        text: "Importer un logo RAGT",
        valid: hasLogo,
        jump: "library",
        label: hasLogo ? "Validé" : "À faire"
      },
      {
        text: "Vérifier la charte RAGT",
        valid: isRagtColors,
        jump: "charter",
        label: isRagtColors ? "Validé" : "À faire"
      },
      {
        text: "Outlook configuré",
        valid: state.preferences.emailMode === "outlook",
        jump: "export",
        label: state.preferences.emailMode === "outlook" ? "Validé" : "À faire"
      },
      {
        text: "Zéro erreur qualité",
        valid: q.issues.length === 0,
        jump: "quality",
        label: q.issues.length === 0 ? "Validé" : "À faire"
      }
    ];

    $("homeChecklist").innerHTML = checklist.map(item => `
      <li class="flex items-center justify-between text-sm cursor-pointer p-2 rounded-xl transition-all duration-200 hover:bg-slate-50 border border-transparent hover:border-slate-100 group" data-jump="${item.jump}">
        <span class="flex items-center gap-3 text-slate-700 font-medium group-hover:text-slate-800">
          ${item.valid ? `
            <svg class="w-5 h-5 text-[#6ba56f] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          ` : `
            <svg class="w-5 h-5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          `}
          <span>${item.text}</span>
        </span>
        <span class="px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${item.valid ? "bg-[#f0fdf4] text-[#6ba56f]" : "bg-[#fffbeb] text-[#deaa3f] group-hover:bg-[#fef3c7]" }">${item.label}</span>
      </li>
    `).join("");

    $("homeChecklist").querySelectorAll("[data-jump]").forEach(li => {
      li.onclick = () => showView(li.dataset.jump);
    });
  }
}

function renderAll(){renderTemplates();renderAppearance();renderBackgrounds();renderPictos();renderToggles();renderSignature();renderAssets();renderLayers();renderCollaborators();renderDocuments();renderTools();renderAnnotations();renderPdfEngine();renderStudio();renderCollaboration();renderConnectors();renderEcosystem();renderBackend();renderBusinessConnectors();renderQualityPanel();diagnostic();syncForm();renderSettingsDocumentProperties();renderHome();}
function defaultWorkspaceCols(){
  return window.innerWidth <= 1200 ? [126,420,Math.max(420,window.innerWidth-560)] : [148,500,Math.max(400,window.innerWidth-700)];
}
function readWorkspaceCols(){
  try{
    const saved=JSON.parse(localStorage.getItem("signatureWorkspaceColsV35")||"null");
    if(Array.isArray(saved)&&saved.length>=3)return saved.slice(0,3).map(Number);
  }catch{}
  return defaultWorkspaceCols();
}
function writeWorkspaceCols(cols){
  localStorage.setItem("signatureWorkspaceColsV35",JSON.stringify(cols.map(v=>Math.round(v))));
}
function applyWorkspaceCols(cols=readWorkspaceCols()){
  const workspace=document.querySelector(".workspace");
  if(!workspace)return;
  if(window.innerWidth<=1200){
    workspace.style.removeProperty("--workspace-cols");
    positionWorkspaceResizers();
    return;
  }
  const pad=10, gap=10;
  const safe=[
    Math.max(112,cols[0]||148),
    Math.max(360,cols[1]||500),
    Math.max(400,cols[2]||720)
  ];
  workspace.style.setProperty("--workspace-cols",`${safe[0]}px ${safe[1]}px minmax(${safe[2]}px,1fr)`);
  workspace.style.setProperty("--workspace-sidebar",`${safe[0]}px`);
  
  // Calculate left panels offset to perfectly center the preview canvas in the window
  const leftWidth = safe[0] + gap + safe[1] + gap + pad;
  const propsHidden = document.querySelector('.props-panel')?.hidden;
  const rightWidth = propsHidden ? 0 : 260; // Approximate right panel
  
  // Only apply center offset if we have a very wide screen to avoid squishing
  const requiredWidth = (leftWidth * 2) + 600; // 600px minimum for preview
  if (window.innerWidth > requiredWidth) {
    const offset = Math.max(0, leftWidth - pad - rightWidth);
    workspace.style.setProperty("--left-panels-offset", `${offset}px`);
  } else {
    workspace.style.setProperty("--left-panels-offset", `0px`);
  }

  positionWorkspaceResizers(safe);
}
function positionWorkspaceResizers(cols=readWorkspaceCols()){
  const workspace=document.querySelector(".workspace");
  if(!workspace)return;
  const handles=workspace.querySelectorAll(".workspace-resizer");
  if(!handles.length)return;
  if(window.innerWidth<=1200 ){
    handles.forEach(h=>h.style.display="none");
    return;
  }
  handles.forEach(h=>h.style.display="block");
  const gap=10,pad=10;
  const lefts=[
    pad+cols[0]+gap/2,
    pad+cols[0]+gap+cols[1]+gap/2
  ];
  handles.forEach((h,i)=>h.style.left=`${lefts[i]}px`);
}
function initWorkspaceResize(){
  const workspace=document.querySelector(".workspace");
  if(!workspace || workspace.dataset.resizeReady)return;
  workspace.dataset.resizeReady="1";
  [0,1].forEach(index=>{
    const h=document.createElement("div");
    h.className="workspace-resizer";
    h.dataset.resizeIndex=String(index);
    h.title="Glisser pour redimensionner. Double-clic pour remettre la disposition.";
    h.ondblclick=()=>{
      localStorage.removeItem("signatureWorkspaceColsV35");
      applyWorkspaceCols(defaultWorkspaceCols());
      toast("Disposition rÃ©initialisÃ©e.");
    };
    h.onmousedown=e=>{
      if(window.innerWidth<=1200)return;
      e.preventDefault();
      const startX=e.clientX;
      const start=readWorkspaceCols();
      workspace.classList.add("resizing-layout");
      const move=ev=>{
        const dx=ev.clientX-startX;
        const next=[...start];
        if(index===0){
          next[0]=Math.max(112,start[0]+dx);
          next[1]=Math.max(360,start[1]-dx);
        }else{
          next[1]=Math.max(360,start[1]+dx);
          next[2]=Math.max(400,start[2]-dx);
        }
        writeWorkspaceCols(next);
        applyWorkspaceCols(next);
      };
      const up=()=>{
        workspace.classList.remove("resizing-layout");
        document.removeEventListener("mousemove",move);
        document.removeEventListener("mouseup",up);
      };
      document.addEventListener("mousemove",move);
      document.addEventListener("mouseup",up);
    };
    workspace.appendChild(h);
  });
  applyWorkspaceCols();
}
function readImage(file,cb){
  if(!file)return;
  if(!(file.type.startsWith("image/")||/\.(svg|ico|png|jpe?g|webp|gif)$/i.test(file.name))){toast("Format non reconnu.");return;}
  const r=new FileReader();r.onerror=()=>toast("Lecture impossible.");r.onload=()=>cb(r.result,file);r.readAsDataURL(file);
}
function importLogo(file){readImage(file,async (src,f)=>{const tags=await autoTagAssetWithAI(f,src);apply(()=>{state.logo.src=src;state.logo.name=f.name;state.assets.unshift({name:f.name,role:"logo",src,tags:tags.includes("Logo")?tags:["Logo",...tags]});state.selectedLayer="logo";toast("Logo importé.");});});}
function importBg(file){readImage(file,async (src,f)=>{const tags=await autoTagAssetWithAI(f,src);apply(()=>{state.background.src=src;state.background.name=f.name;state.assets.unshift({name:f.name,role:"background",src,tags:tags.includes("Fond")?tags:["Fond",...tags]});toast("Fond importé.");});});}
function importShape(file){readImage(file,async (src,f)=>{const tags=await autoTagAssetWithAI(f,src);apply(()=>{state.assets.unshift({id:"user_asset_"+Date.now()+"_"+Math.floor(Math.random()*999),name:f.name,role:"shape",type:"shape",category:"shapes",src,tags:tags.includes("Forme")?tags:["Forme","Calque",...tags]});toast("Forme importée.");});});}
function importCustomIcon(slot,file){readImage(file,async (src,f)=>{const tags=await autoTagAssetWithAI(f,src);apply(()=>{state.design.customIcons=state.design.customIcons||{};state.design.customIcons[slot]=src;state.assets.unshift({name:f.name,role:"icon-"+slot,src,tags:[slot,"picto",...tags]});toast("Icône personnalisée ajoutée.");});});}
function importAnyAssets(files){
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
}

async function autoTagAssetWithAI(file, src) {
  return new Promise(resolve => {
    setTimeout(() => {
      const tags = [];
      const name = file.name.toLowerCase();
      if (name.includes("logo")) tags.push("Logo");
      if (name.includes("icon") || name.includes("picto")) tags.push("Icône");
      if (name.includes("bg") || name.includes("fond") || name.includes("back")) tags.push("Fond");
      if (tags.length === 0) tags.push("Image");
      
      const img = new Image();
      img.onload = () => {
        if (img.width === img.height) {
          if (!tags.includes("Icône") && img.width < 256) tags.push("Icône");
          if (!tags.includes("Logo") && img.width >= 256) tags.push("Logo");
        } else if (img.width > img.height * 2) {
          if (!tags.includes("Fond")) tags.push("Fond");
        }
        resolve(tags);
      };
      img.onerror = () => resolve(tags);
      img.src = src;
    }, 150); // fast mock AI delay
  });
}
function importLibraryJson(file){
  if(!file)return;
  const r=new FileReader();
  r.onload=()=>{try{const data=JSON.parse(r.result);apply(()=>{if(Array.isArray(data.assets))state.assets.unshift(...data.assets);if(data.customIcons)state.design.customIcons={...(state.design.customIcons||{}),...data.customIcons};});toast("Bibliothèque importée.");}catch(e){toast("JSON bibliothèque invalide.");}};
  r.readAsText(file);
}

function maxZ(){return Math.max(0,...Object.values(state.blocks).map(b=>b.z||0));}
function minZ(){return Math.min(0,...Object.values(state.blocks).map(b=>b.z||0));}
function setLayerZ(k,z){if(state.blocks[k])state.blocks[k].z=z;}
function bringFront(k=state.selectedLayer){apply(()=>setLayerZ(k,maxZ()+10),true,"Calque devant : "+layerName(k));}
function sendBack(k=state.selectedLayer){apply(()=>setLayerZ(k,minZ()-10),true,"Calque derriere : "+layerName(k));}
function moveLayer(k,dir){
  apply(()=>{
    const current=state.blocks[k]; if(!current)return;
    const keys=state.blockOrder.filter(id=>state.blocks[id]).sort((a,b)=>(state.blocks[a].z||0)-(state.blocks[b].z||0)); const idx=keys.indexOf(k); if(idx===-1)return; if(dir==="up"&&idx<keys.length-1){ const next=keys[idx+1]; const temp=current.z||0; let nz=state.blocks[next].z||0; if(temp===nz) current.z=temp+1; else { current.z=nz; state.blocks[next].z=temp; } } else if(dir==="down"&&idx>0){ const prev=keys[idx-1]; const temp=current.z||0; let pz=state.blocks[prev].z||0; if(temp===pz) current.z=temp-1; else { current.z=pz; state.blocks[prev].z=temp; } }
  },true,(dir==="up"?"Calque monte : ":"Calque descend : ")+layerName(k));
}
function duplicateBlock(k=state.selectedLayer){
  const b=state.blocks[k]; if(!b)return;
  const id="dup_"+k+"_"+Date.now();
  apply(()=>{
    state.blocks[id]={...clone(b),x:b.x+28,y:b.y+28,z:maxZ()+10,locked:false,visible:true,label:layerName(k)+" copie",type:b.type||k};
    if((b.type||k)==="text") {state.blocks[id].type="customText"; state.blocks[id].content=(state.identity.firstName||"FIRSTNAME")+" "+(state.identity.lastName||"LASTNAME");}
    if((b.type||k)==="logo") {state.blocks[id].type="logo";}
    if((b.type||k)==="socials") {state.blocks[id].type="socials";}
    state.blockOrder.push(id);
    state.selectedLayer=id;
  },true,"Calque duplique : "+layerName(k));
  toast("Bloc duplique.");
}
function deleteBlock(k=state.selectedLayer){
  if(["logo","text","socials"].includes(k)){toast("Les blocs principaux se masquent mais ne se suppriment pas.");apply(()=>state.blocks[k].visible=false,true,"Calque masque : "+layerName(k));return;}
  apply(()=>{delete state.blocks[k];state.blockOrder=state.blockOrder.filter(x=>x!==k);state.selectedLayer="logo";},true,"Calque supprime : "+layerName(k));
}

function parseCsv(text){
  const rows=[];
  let row=[], cur="", quote=false;
  for(let i=0;i<text.length;i++){
    const c=text[i], n=text[i+1];
    if(c==='"' && quote && n==='"'){cur+='"';i++;continue;}
    if(c==='"'){quote=!quote;continue;}
    if(c==="," && !quote){row.push(cur);cur="";continue;}
    if((c==="\n"||c==="\r") && !quote){
      if(c==="\r" && n==="\n") i++;
      row.push(cur);cur="";
      if(row.some(v=>String(v).trim()!=="")) rows.push(row);
      row=[];
      continue;
    }
    cur+=c;
  }
  row.push(cur);
  if(row.some(v=>String(v).trim()!=="")) rows.push(row);
  if(!rows.length)return [];
  const headers=rows.shift().map(h=>h.trim());
  return rows.map(r=>{
    const obj={};
    headers.forEach((h,i)=>obj[h]=(r[i]||"").trim());
    return obj;
  });
}
function importCsvFile(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>importCsvText(reader.result);
  reader.onerror=()=>toast("Lecture CSV impossible.");
  reader.readAsText(file,"utf-8");
}
function importCsvText(text){
  const list=parseCsv(text||"");
  if(!list.length){toast("Aucune ligne CSV trouvée.");return;}
  apply(()=>{
    state.collaborators=list.map((c,i)=>normalizeCollaborator(c,i));
    state.selectedCollaboratorIndex=0;
  });
  $("csvPasteBox")?.classList.remove("open");
  toast(`${list.length} collaborateurs importés.`);
}
function openPdfInNewTab(index) {
  const d = state.documents[index];
  if (!d || docKind(d) !== "PDF") return;
  const win = window.open();
  win.document.write(`<iframe src="${d.src}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
}

async function extractCollaboratorsFromPdf(index) {
  const d = state.documents[index];
  if (!d || docKind(d) !== "PDF") return;
  
  toast("Analyse du PDF par Gemini...");
  
  const base64Data = d.src.split(",")[1];
  const inlineData = {
    data: base64Data,
    mimeType: "application/pdf"
  };
  
  const prompt = "Analyse ce document et extrais une liste de personnes (collaborateurs) sous forme de tableau JSON. Chaque objet doit avoir les clés : firstName, lastName, jobTitle, email, phone. Si des données manquent, laisse vide. Ne renvoie QUE le JSON brut.";
  
  const res = await callGemini(prompt, "gemini-1.5-flash", inlineData);
  if (res) {
    try {
      // Nettoyage markdown
      const jsonStr = res.replace(/```json/g, "").replace(/```/g, "").trim();
      const list = JSON.parse(jsonStr);
      if (Array.isArray(list)) {
        apply(() => {
          const normalized = list.map((c, i) => normalizeCollaborator(c, state.collaborators.length + i));
          state.collaborators.push(...normalized);
          toast(`${normalized.length} collaborateur(s) extrait(s) et ajouté(s).`);
          showView("collaborators");
        });
      } else {
        throw new Error("Format JSON invalide");
      }
    } catch (e) {
      console.error("Parse Error:", e, res);
      toast("Erreur lors de l'analyse des données : " + e.message);
    }
  }
}

function copyToClipboard(text){
  if(!navigator.clipboard){
    const el=document.createElement("textarea");
    el.value=text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    return;
  }
  navigator.clipboard.writeText(text);
}
function normalizeCollaborator(c,i=0){
  const out={};
  ["firstName","lastName","jobTitle","department","company","phone","mobile","email","address","website","linkedin","facebook","instagram","youtube","x"].forEach(k=>out[k]=c[k]||"");
  out._id=c._id||("collab_"+Date.now()+"_"+i);
  return out;
}
function collaboratorIssues(c){
  const issues=[];
  const required=["firstName","lastName","jobTitle","email"];
  if(state.bulkSettings.requiredFields) required.forEach(k=>{if(!String(c[k]||"").trim())issues.push(`${k} manquant`);});
  if(c.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) issues.push("email invalide");
  if(!c.phone && !c.mobile) issues.push("aucun téléphone");
  return issues;
}
function renderCollaborators(){
  if(!$("collaboratorsTable")) return;
  let valid=0,warn=0;
  $("collaboratorsTable").innerHTML=state.collaborators.map((c,i)=>{
    const issues=collaboratorIssues(c);
    if(!issues.length) valid++; else warn++;
    const status=!issues.length?`<span class="badge-ok">OK</span>`:`<span class="${issues.length>1?'badge-ko':'badge-warn'}">${issues.length} alerte${issues.length>1?'s':''}</span>`;
    return `<tr class="${state.selectedCollaboratorIndex===i?'selected':''}">
      <td><strong>${esc((c.firstName||"")+" "+(c.lastName||""))}</strong><br><span>${esc(c.department||c.company||"")}</span></td>
      <td>${esc(c.jobTitle||"")}</td>
      <td>${esc(c.email||"")}</td>
      <td>${esc(c.phone||c.mobile||"")}</td>
      <td title="${esc(issues.join(", "))}">${status}</td>
      <td><button data-select-collab="${i}">Sélection</button></td>
    </tr>`;
  }).join("");
  document.querySelectorAll("[data-select-collab]").forEach(b=>b.onclick=()=>apply(()=>state.selectedCollaboratorIndex=+b.dataset.selectCollab,false));
  $("collabCount").textContent=state.collaborators.length;
  $("collabValid").textContent=valid;
  $("collabWarnings").textContent=warn;
  const sel=state.collaborators[state.selectedCollaboratorIndex];
  $("collabSelected").textContent=sel?`${sel.firstName||""} ${sel.lastName||""}`.trim()||"ligne":"aucun";
}
function applySelectedCollaborator(){
  const c=state.collaborators[state.selectedCollaboratorIndex];
  if(!c)return toast("Aucun collaborateur sélectionné.");
  apply(()=>{Object.keys(state.identity).forEach(k=>{if(c[k]!==undefined)state.identity[k]=c[k];});});
  showView("appearance");
  toast("Collaborateur appliqué à l’aperçu.");
}
function stateWithCollaborator(c){
  const s=clone(state);
  Object.keys(s.identity).forEach(k=>{if(c[k]!==undefined)s.identity[k]=c[k];});
  return s;
}
function signatureHtmlForCollaborator(c){
  const s=stateWithCollaborator(c);
  const fullName=esc(((s.identity.firstName||"FIRSTNAME")+" "+(s.identity.lastName||"LASTNAME")).trim());
  const job=esc(s.identity.jobTitle||"MARKETING MANAGER");
  const phone=esc(s.identity.phone||s.identity.mobile||"+33 0 00 00 00 00");
  const email=esc(s.identity.email||"prenom.nom@ragt.com");
  const address=esc(s.identity.address||"");
  const website=esc(s.identity.website||"www.ragt.com");
  const bg=s.design.bg1;
  const fg=s.design.fg;
  const accent=s.design.accent;
  const logo=s.logo.src?`<img src="${s.logo.src}" alt="Logo" style="max-width:180px;max-height:100px;">`:`<strong>LOGO</strong>`;
  return `<table cellpadding="0" cellspacing="0" border="0" style="width:760px;background:${bg};color:${fg};font-family:Arial,Helvetica,sans-serif;border-radius:16px;overflow:hidden;">
<tr>
<td style="width:240px;padding:24px;text-align:center;">${logo}</td>
<td style="padding:24px;">
<div style="font-size:26px;font-weight:900;text-transform:uppercase;color:${fg};">${fullName}</div>
<div style="font-size:14px;font-weight:800;text-transform:uppercase;color:${accent};margin:8px 0 12px;">${job}</div>
<div style="width:70px;height:4px;background:${accent};border-radius:99px;margin-bottom:12px;"></div>
<div style="font-size:14px;line-height:22px;color:${fg};">
☎ ${phone}<br>
✉ <a href="mailto:${email}" style="color:${fg};text-decoration:none;">${email}</a><br>
${address?`● ${address}<br>`:""}
◎ ${website}
</div>
</td>
</tr>
</table>`;
}
function safeFileName(name){
  return String(name||"signature").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9_-]+/gi,"_").replace(/^_+|_+$/g,"").toLowerCase()||"signature";
}
function bulkExportHtml(){
  if(!state.collaborators.length)return toast("Aucun collaborateur à exporter.");
  const files=state.collaborators.map((c,i)=>{
    const name=safeFileName(`${c.lastName||"nom"}_${c.firstName||"prenom"}_${i+1}`);
    return [`signatures/${name}.html`,signatureHtmlForCollaborator(c)];
  });
  files.push(["rapport-qualite.json",JSON.stringify(buildQualityReport(),null,2)]);
  const blob=makeZip(files);
  download("signatures-collaborateurs-html.zip",blob,"application/zip");
  toast("ZIP HTML collaborateurs généré.");
}
function setBulkProgress(title,text,percent,running=true){
  if(!$("bulkProgress")) return;
  $("bulkProgress").classList.toggle("running",!!running);
  $("bulkProgressTitle").textContent=title;
  $("bulkProgressText").textContent=text;
  $("bulkProgressFill").style.width=Math.max(0,Math.min(100,percent||0))+"%";
}
function blobToUint8Array(blob){
  if(!blob) return Promise.resolve(new Uint8Array());
  return blob.arrayBuffer().then(buffer=>new Uint8Array(buffer));
}
async function canvasBlob(type="image/png", quality=.92){
  const canvas=$("exportCanvas");
  if(!canvas) return null;
  return new Promise(resolve=>{
    try{
      canvas.toBlob(blob=>resolve(blob),type,quality);
    }catch(e){
      console.warn("Export canvas bloque",e);
      resolve(null);
    }
  });
}
function withCollaboratorIdentity(collaborator, fn){
  const backup=clone(state.identity);
  Object.keys(state.identity).forEach(k=>{if(collaborator[k]!==undefined)state.identity[k]=collaborator[k];});
  const result=fn();
  state.identity=backup;
  return result;
}
async function renderImageBlobForCollaborator(collaborator, kind="png"){
  const canvas=$("exportCanvas");
  const ctx=canvas.getContext("2d");
  canvas.width=state.canvas.width*2;
  canvas.height=state.canvas.height*2;
  ctx.setTransform(2,0,0,2,0,0);
  await withCollaboratorIdentity(collaborator,()=>drawCanvas(ctx));
  const type=kind==="jpeg"?"image/jpeg":"image/png";
  return await canvasBlob(type,.92);
}
async function bulkExportImages(kind="png"){
  if(!state.collaborators.length){toast("Aucun collaborateur à exporter.");return;}
  const ext=kind==="jpeg"?"jpg":"png";
  const mime=kind==="jpeg"?"image/jpeg":"image/png";
  setBulkProgress(`Export ZIP ${ext.toUpperCase()}`,"Préparation...",0,true);
  const entries=[];
  for(let i=0;i<state.collaborators.length;i++){
    const c=state.collaborators[i];
    const name=safeFileName(`${c.lastName||"nom"}_${c.firstName||"prenom"}_${i+1}`);
    setBulkProgress(`Export ZIP ${ext.toUpperCase()}`,`${i+1}/${state.collaborators.length} · ${name}.${ext}`,Math.round((i/state.collaborators.length)*92),true);
    const blob=await renderImageBlobForCollaborator(c,kind);
    if(!blob){setBulkProgress(`Export ZIP ${ext.toUpperCase()}`,"Export interrompu : image distante non exportable.",100,false);toast("Export interrompu : importez les images distantes en local avant l'export.");return;}
    const bytes=await blobToUint8Array(blob);
    entries.push([`signatures-images/${name}.${ext}`,bytes]);
    await new Promise(resolve=>setTimeout(resolve,0));
  }
  entries.push(["rapport-qualite.json",new TextEncoder().encode(JSON.stringify(buildQualityReport(),null,2))]);
  entries.push(["README.txt",new TextEncoder().encode(`Export images généré par Signature PWA v20.
Format : ${mime}
Nombre : ${state.collaborators.length}
`)]);
  const zip=makeZipBinary(entries);
  download(`signatures-collaborateurs-${ext}.zip`,zip,"application/zip");
  setBulkProgress(`Export ZIP ${ext.toUpperCase()}`,"Terminé",100,false);
  toast(`ZIP ${ext.toUpperCase()} collaborateurs généré.`);
}
async function bulkExportFullPack(){
  setBulkProgress("Pack complet", "Generation du pack...", 4, true);
  const entries=[];
  if(!state.collaborators.length){
    entries.push(["html/signature-active.html", new TextEncoder().encode(getEmailHtml())]);
    const blob=await canvasBlob("image/png", .92);
    if(blob){
      entries.push(["png/signature-active.png", await blobToUint8Array(blob)]);
    }
    entries.push(["rapport-qualite.json", new TextEncoder().encode(JSON.stringify(qualityReportData(), null, 2))]);
    entries.push(["projet-signature.json", new TextEncoder().encode(JSON.stringify(state, null, 2))]);
    entries.push(["README.txt", new TextEncoder().encode("Pack production Signature Studio : signature active, rapport qualite et projet JSON. Ajoutez des collaborateurs pour generer un pack de masse.")]);
    const zip=makeZipBinary(entries);
    download("signature-pack-production.zip", zip, "application/zip");
    setBulkProgress("Pack complet", "Termine", 100, false);
    toast("Pack production genere pour la signature active.");
    return;
  }
  state.collaborators.forEach((c,i)=>{
    const name=safeFileName((c.lastName||"nom")+"_"+(c.firstName||"prenom")+"_"+(i+1));
    entries.push(["html/"+name+".html", new TextEncoder().encode(signatureHtmlForCollaborator(c))]);
  });
  for(let i=0;i<state.collaborators.length;i++){
    const c=state.collaborators[i];
    const name=safeFileName((c.lastName||"nom")+"_"+(c.firstName||"prenom")+"_"+(i+1));
    setBulkProgress("Pack complet", (i+1)+"/"+state.collaborators.length+" - PNG", Math.round(10+(i/state.collaborators.length)*80), true);
    const blob=await renderImageBlobForCollaborator(c,"png");
    if(!blob){
      setBulkProgress("Pack complet", "Export interrompu : image distante non exportable.", 100, false);
      toast("Export interrompu : importez les images distantes en local avant l'export.");
      return;
    }
    entries.push(["png/"+name+".png", await blobToUint8Array(blob)]);
    await new Promise(resolve=>setTimeout(resolve,0));
  }
  entries.push(["rapport-qualite.json", new TextEncoder().encode(JSON.stringify(buildQualityReport(),null,2))]);
  entries.push(["projet-signature.json", new TextEncoder().encode(JSON.stringify(state,null,2))]);
  entries.push(["README.txt", new TextEncoder().encode("Pack production Signature Studio : HTML + PNG + rapport qualite + projet JSON.")]);
  const zip=makeZipBinary(entries);
  download("signature-pack-production.zip", zip, "application/zip");
  setBulkProgress("Pack complet", "Termine", 100, false);
  toast("Pack complet genere.");
}

function buildQualityReport(){
  return {
    total:state.collaborators.length,
    valid:state.collaborators.filter(c=>!collaboratorIssues(c).length).length,
    warnings:state.collaborators.map((c,i)=>({index:i+1,name:`${c.firstName||""} ${c.lastName||""}`.trim(),issues:collaboratorIssues(c)})).filter(x=>x.issues.length),
    generatedAt:new Date().toISOString()
  };
}
function showQualityReport(){
  const r=buildQualityReport();
  const div=document.createElement("div");
  div.className="quality-toast";
  div.innerHTML=`<strong>Contrôle qualité</strong><br>Total : ${r.total}<br>Valides : ${r.valid}<br>Alertes : ${r.warnings.length}<br>${r.warnings.slice(0,5).map(w=>`• ${esc(w.name||"ligne "+w.index)} : ${esc(w.issues.join(", "))}`).join("<br>") || "Aucune alerte."}`;
  document.body.appendChild(div);
  setTimeout(()=>div.remove(),5200);
}


function renderAppearance(){
  renderAppearanceTemplates();
  renderAppearanceBackgrounds();
  renderAppearanceIcons();
  renderAppearanceBlocks();
  renderSnapshots();
  renderMiniLibrary();
  if($("appearanceZoomLevel")) $("appearanceZoomLevel").textContent=Math.round((state.preferences.zoom||1)*100)+"%";
}
function renderMiniLibrary() {
  if(!$("miniLibraryGrid")) return;
  let html = "";
  const filter = $("miniLibraryFilter")?.value || "all";
  const items = state.assets.filter(a => {
    if(filter === "all") return true;
    if(filter === "logo" && a.role === "logo") return true;
    if(filter === "background" && a.role === "background") return true;
    if(filter === "icon" && a.role === "icon") return true;
    if(filter === "motif" && a.role === "motif") return true;
    return false;
  });
  if(items.length === 0) {
    $("miniLibraryGrid").innerHTML = `<div class="col-span-full text-center text-slate-400 text-sm py-8">Aucun asset dans cette catégorie.</div>`;
    return;
  }
  items.forEach(a => {
    let preview = `<div class="w-full h-16 bg-slate-100 flex items-center justify-center rounded overflow-hidden">`;
    if(a.role==="motif") {
      preview += `<div class="w-full h-full opacity-50" style="background-image:url('${a.src}');background-size:cover;background-position:center"></div>`;
    } else {
      preview += `<img src="${a.src}" class="max-w-full max-h-full object-contain p-1">`;
    }
    preview += `</div>`;
    html += `<div class="bg-white border border-slate-200 rounded p-2 hover:border-navy cursor-pointer" onclick="applyAssetFromMiniLibrary('${a.src}', '${a.role}')">
      ${preview}
      <div class="text-[10px] font-semibold text-slate-500 mt-1 truncate">${a.name}</div>
    </div>`;
  });
  $("miniLibraryGrid").innerHTML = html;
}
window.applyAssetFromMiniLibrary = function(src, role) {
  apply(() => {
    if(role === "logo" || role === "icon") {
      state.logo.src = src;
      state.logo.name = "Asset de bibliothèque";
    } else if(role === "background" || role === "motif") {
      state.background.src = src;
      state.background.name = "Asset de bibliothèque";
    }
    toast("Asset appliqué à la signature.");
  });
};
function renderAppearanceTemplates(){
  if(!$("appearanceTemplatesGrid")) return;
  const q=($("appearanceTemplateSearch")?.value||"").toLowerCase();
  const f=$("appearanceTemplateFilter")?.value||"all";
  const list=themeCatalog().filter(t=>(f==="all"||t.category===f)&&(!q||t.name.toLowerCase().includes(q)||t.category.toLowerCase().includes(q)));
  $("appearanceTemplatesGrid").innerHTML=list.slice(0,8).map(t=>`<div class="template-card ${state.design.templateId===t.id?"active":""}">
    <div class="template-thumb" style="background:${bgCss(t.bgStyle,t.bg1,t.bg2)};color:${t.fg}"></div>
    <strong>${esc(t.name)}</strong><span>${esc(t.category)}</span>
    <div class="actions"><button data-app-template="${t.id}">Utiliser</button></div>
  </div>`).join("");
  document.querySelectorAll("[data-app-template]").forEach(b=>b.onclick=()=>applyTemplate(findTheme(b.dataset.appTemplate)));
}
function renderAppearanceBackgrounds(){
  if(!$("appearanceBackgroundsGrid")) return;
  const q=($("appearanceBackgroundSearch")?.value||"").toLowerCase();
  const f=$("appearanceBackgroundFilter")?.value||"all";
  const list=backgrounds.filter(b=>(f==="all"||b.category===f)&&(!q||b.name.toLowerCase().includes(q)||b.category.toLowerCase().includes(q)));
  $("appearanceBackgroundsGrid").innerHTML=list.slice(0,8).map(b=>`<div class="bg-card ${state.design.bg1===b.bg1&&state.design.bg2===b.bg2?"active":""}">
    <div class="bg-thumb" style="background:${bgCss(b.bgStyle,b.bg1,b.bg2)};color:${b.fg}">
      <div class="mock-logo"></div><div class="mock-title"></div>
    </div>
    <strong>${esc(b.name)}</strong><span>${esc(b.category)}</span>
    <div class="actions"><button data-app-bg="${b.id}">Appliquer</button></div>
  </div>`).join("");
  document.querySelectorAll("[data-app-bg]").forEach(btn=>btn.onclick=()=>applyBackground(backgrounds.find(b=>b.id===btn.dataset.appBg)));
}
function cloneOptions(fromId,toId){
  const from=$(fromId), to=$(toId);
  if(!from||!to||to.options.length) return;
  to.innerHTML=from.innerHTML;
  to.value=from.value;
}
function syncAppearanceControls(){
  cloneOptions("documentType","appearanceDocumentType");
  cloneOptions("layout","appearanceLayout");
  cloneOptions("bgStyle","appearanceBgStyle");
  cloneOptions("motif","appearanceMotif");
  ["appearanceBg1","appearanceBg2","appearanceFg","appearanceAccent"].forEach(id=>{
    const map={appearanceBg1:"bg1",appearanceBg2:"bg2",appearanceFg:"fg",appearanceAccent:"accent"};
    if($(id)) $(id).value=state.design[map[id]];
  });
  if($("appearanceSmartGuides")) $("appearanceSmartGuides").checked = !!state.preferences.smartGuides;
}
function renderAppearanceIcons(){
  if(!$("appearanceIconSlotGrid")) return;
  const list=[
    ["phone","Téléphone","☎"],["mobile","Mobile","✆"],["email","Email","✉"],["address","Adresse","●"],["website","Site","◎"],
    ["linkedin","LinkedIn","in"],["facebook","Facebook","f"],["instagram","Instagram","ig"],["youtube","YouTube","▶"],["x","X","𝕏"]
  ];
  $("appearanceIconSlotGrid").innerHTML=list.map(([key,label,sym])=>`<div class="icon-slot-card">
    <div class="slot-preview">${state.design.customIcons?.[key]?'<img src="'+state.design.customIcons[key]+'">':sym}</div>
    <strong>${label}</strong>
    <button data-custom-icon="${key}">Importer</button>
  </div>`).join("");
  document.querySelectorAll("[data-custom-icon]").forEach(b=>b.onclick=()=>{state.pendingIconSlot=b.dataset.customIcon;$("customIconInput").value="";$("customIconInput").click();});
}
function renderAppearanceBlocks(){
  if(!$("appearanceBlockManagerList")) return;
  const keys=state.blockOrder.filter(k=>state.blocks[k]).sort((a,b)=>(state.blocks[b].z||0)-(state.blocks[a].z||0));
  $("appearanceBlockManagerList").innerHTML=keys.map(k=>{const b=state.blocks[k];return `<div class="block-manager-card ${state.selectedLayer===k?"active":""}">
    <div><strong>${layerName(k)}</strong><span>${b.x}, ${b.y} · ${b.w}×${b.h} · z ${b.z||0}</span></div>
    <div class="block-manager-actions">
      <button data-lock-layer="${k}" class="p-1 rounded hover:bg-slate-100 ${b.locked?'text-red-500':'text-slate-400'}" title="Verrouiller/Déverrouiller">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${b.locked?'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z':'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z'}"></path></svg>
      </button>
      <button data-sel-layer="${k}">Sél.</button>
      <button data-dup-block="${k}" class="secondary">Dup.</button>
    </div>
  </div>`;}).join("");
  document.querySelectorAll("[data-sel-layer]").forEach(btn=>btn.onclick=()=>{
    apply(()=>state.selectedLayer=btn.dataset.selLayer);
  });
  document.querySelectorAll("[data-dup-block]").forEach(btn=>btn.onclick=()=>{
    apply(()=>{state.selectedLayer=btn.dataset.dupBlock;duplicateBlock();});
  });
  document.querySelectorAll("[data-lock-layer]").forEach(btn=>btn.onclick=(e)=>{
    e.stopPropagation();
    apply(()=>state.blocks[btn.dataset.lockLayer].locked=!state.blocks[btn.dataset.lockLayer].locked);
  });
}

function renderSnapshots() {
  if (!$("appearanceSnapshotsList")) return;
  const list = $("appearanceSnapshotsList");
  if (!state.snapshots || !state.snapshots.length) {
    list.innerHTML = `<div class="text-sm text-slate-500 text-center p-4">Aucun snapshot.</div>`;
    return;
  }
  list.innerHTML = state.snapshots.map((snap, i) => `
    <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 relative">
      <div class="font-bold text-slate-800 text-sm flex justify-between">
        <span>${snap.name || `Snapshot ${i+1}`}</span>
        <span class="text-xs text-slate-500 font-normal">${new Date(snap.date).toLocaleString()}</span>
      </div>
      <div class="flex gap-2 mt-2">
        <button data-restore-snap="${snap.id}" class="flex-1 py-1.5 bg-navy text-white text-xs font-semibold rounded hover:bg-navy2">Restaurer</button>
        <button data-delete-snap="${snap.id}" class="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded border border-red-200 hover:bg-red-100">X</button>
      </div>
    </div>
  `).join("");
  document.querySelectorAll("[data-restore-snap]").forEach(btn => btn.onclick = () => {
    const id = btn.dataset.restoreSnap;
    const snap = state.snapshots.find(s => s.id === id);
    if(snap) {
      apply(() => {
        const snapClone = clone(snap.data);
        state.blocks = snapClone.blocks;
        state.design = snapClone.design;
        state.logo = snapClone.logo;
        state.background = snapClone.background;
        state.preferences = snapClone.preferences;
      });
      toast("Snapshot restauré.");
    }
  });
  document.querySelectorAll("[data-delete-snap]").forEach(btn => btn.onclick = () => {
    apply(() => {
      state.snapshots = state.snapshots.filter(s => s.id !== btn.dataset.deleteSnap);
    });
    toast("Snapshot supprimé.");
  });
}

function bindAppearance(){
  document.querySelectorAll(".appearance-tab").forEach(b=>b.onclick=()=>{
    document.querySelectorAll(".appearance-tab").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".appearance-pane").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    $(b.dataset.appearanceTarget)?.classList.add("active");
  });
  if($("appearanceTemplateSearch")) $("appearanceTemplateSearch").oninput=renderAppearanceTemplates;
  if($("appearanceTemplateFilter")) $("appearanceTemplateFilter").onchange=renderAppearanceTemplates;
  if($("appearanceBackgroundSearch")) $("appearanceBackgroundSearch").oninput=renderAppearanceBackgrounds;
  if($("appearanceBackgroundFilter")) $("appearanceBackgroundFilter").onchange=renderAppearanceBackgrounds;
  if($("appearanceDocumentType")) $("appearanceDocumentType").onchange=()=>apply(()=>{$("documentType").value=$("appearanceDocumentType").value;$("documentType").onchange();});
  if($("appearanceLayout")) $("appearanceLayout").onchange=()=>apply(()=>{$("layout").value=$("appearanceLayout").value;$("layout").onchange();});
  if($("appearanceBgStyle")) $("appearanceBgStyle").onchange=()=>apply(()=>{$("bgStyle").value=$("appearanceBgStyle").value;$("bgStyle").oninput();});
  if($("appearanceMotif")) $("appearanceMotif").onchange=()=>apply(()=>{$("motif").value=$("appearanceMotif").value;$("motif").oninput();});
  if($("appearanceSmartGuides")) $("appearanceSmartGuides").onchange=()=>apply(()=>state.preferences.smartGuides=$("appearanceSmartGuides").checked);
  [["appearanceBg1","bg1"],["appearanceBg2","bg2"],["appearanceFg","fg"],["appearanceAccent","accent"]].forEach(([a,b])=>{if($(a))$(a).oninput=()=>apply(()=>{$(b).value=$(a).value;$(b).oninput();});});
  if($("appearanceDuplicateBlockBtn")) $("appearanceDuplicateBlockBtn").onclick=()=>apply(()=>duplicateBlock());
  if($("appearanceMoveUpBtn")) $("appearanceMoveUpBtn").onclick=()=>apply(()=>moveLayer(state.selectedLayer,"up"));
  if($("appearanceMoveDownBtn")) $("appearanceMoveDownBtn").onclick=()=>apply(()=>moveLayer(state.selectedLayer,"down"));
  if($("appearanceSendBackBtn")) $("appearanceSendBackBtn").onclick=()=>apply(()=>sendBack());
  if($("appearanceBringFrontBtn")) $("appearanceBringFrontBtn").onclick=()=>apply(()=>bringFront());
  if($("appearanceUndoBtn")) $("appearanceUndoBtn").onclick=undo;
  if($("appearanceRedoBtn")) $("appearanceRedoBtn").onclick=redo;
  if($("appearanceZoomInBtn")) $("appearanceZoomInBtn").onclick=()=>apply(()=>state.preferences.zoom=Math.min(3, (state.preferences.zoom||1)+0.1));
  if($("appearanceZoomOutBtn")) $("appearanceZoomOutBtn").onclick=()=>apply(()=>state.preferences.zoom=Math.max(0.25, (state.preferences.zoom||1)-0.1));
  if($("appearanceZoomAutoBtn")) $("appearanceZoomAutoBtn").onclick=()=>apply(()=>{
    const viewWidth = $("appearanceViewContent").clientWidth - 64; // Account for padding
    const viewHeight = $("appearanceViewContent").clientHeight - 64;
    const scaleX = viewWidth / state.canvas.width;
    const scaleY = viewHeight / state.canvas.height;
    state.preferences.zoom = Math.max(0.25, Math.min(3, scaleX, scaleY));
  });
  if($("appearanceGridToggleBtn")) $("appearanceGridToggleBtn").onclick=()=>{
    state.preferences.showGrid = !state.preferences.showGrid;
    if($("previewWrap")) {
      $("previewWrap").classList.toggle("show-precision-grid", state.preferences.showGrid);
    }
  };
  if($("appearanceCreateSnapshotBtn")) $("appearanceCreateSnapshotBtn").onclick=()=>apply(()=>{
    const snap = {
      id: "snap_" + Date.now(),
      name: "Version " + (state.snapshots.length + 1),
      date: new Date().toISOString(),
      data: {
        blocks: clone(state.blocks),
        design: clone(state.design),
        logo: clone(state.logo),
        background: clone(state.background),
        preferences: clone(state.preferences)
      }
    };
    state.snapshots.push(snap);
    toast("Snapshot créé.");
  });
  if($("appearanceSaveThemeBtn")) $("appearanceSaveThemeBtn").onclick=saveCurrentTheme;
  if($("miniLibraryFilter")) $("miniLibraryFilter").onchange=renderMiniLibrary;
  if($("miniLibraryImportBtn")) $("miniLibraryImportBtn").onclick=()=>{$("anyAssetInput").value="";$("anyAssetInput").click();};
}
function importDocuments(files){
  if(!files.length)return;
  files.forEach(file=>{
    const reader=new FileReader();
    const type=file.type||guessDocumentType(file.name);
    reader.onload=()=>apply(()=>{
      state.documents.unshift({name:file.name,type,size:file.size,src:reader.result,importedAt:new Date().toISOString()});
      state.ux.selectedDocumentIndex=0;
    });
    if(type.includes("text")||file.name.toLowerCase().endsWith(".csv")) reader.readAsText(file,"utf-8");
    else reader.readAsDataURL(file);
  });
  toast("Document(s) importé(s).");
}
function guessDocumentType(name){
  const n=String(name||"").toLowerCase();
  if(n.endsWith(".pdf"))return "application/pdf";
  if(n.endsWith(".doc")||n.endsWith(".docx"))return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if(n.endsWith(".xls")||n.endsWith(".xlsx"))return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if(n.endsWith(".ppt")||n.endsWith(".pptx"))return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
  if(n.endsWith(".csv"))return "text/csv";
  if(n.endsWith(".txt"))return "text/plain";
  return "application/octet-stream";
}
function renderDocuments(){
  if(!$("documentsList"))return;
  $("documentsList").innerHTML=state.documents.length?state.documents.map((d,i)=>`<div class="document-item ${state.ux.selectedDocumentIndex===i?"active":""}" data-doc="${i}">
    <strong>${esc(d.name)}</strong><span>${esc(docKind(d))} · ${(d.size/1024).toFixed(1)} Ko</span>
  </div>`).join(""):`<div class="document-item"><strong>Aucun document</strong><span>PDF, Word, Excel, PowerPoint, CSV ou TXT</span></div>`;
  document.querySelectorAll("[data-doc]").forEach(b=>b.onclick=()=>apply(()=>state.ux.selectedDocumentIndex=+b.dataset.doc,false));
  if($("documentPreviewBody") && !$("documentPreviewBody").hidden)renderDocumentPreview();
}
function docKind(d){
  const n=d.name.toLowerCase();
  if(n.endsWith(".pdf"))return "PDF";
  if(n.endsWith(".doc")||n.endsWith(".docx"))return "Word";
  if(n.endsWith(".xls")||n.endsWith(".xlsx"))return "Excel";
  if(n.endsWith(".ppt")||n.endsWith(".pptx"))return "PowerPoint";
  if(n.endsWith(".csv"))return "CSV";
  if(n.endsWith(".txt"))return "Texte";
  return "Document";
}
function renderDocumentPreview(){
  if(!$("documentPreviewBody"))return;
  const d=state.documents[state.ux.selectedDocumentIndex];
  if(!d){
    if($("previewTitle"))$("previewTitle").textContent="Aperçu document";
    if($("previewStatus"))$("previewStatus").textContent="Aucun document";
    $("documentPreviewBody").innerHTML=`<div class="unified-document-placeholder">Importe ou sélectionne un document pour l'afficher ici.</div>`;
    return;
  }
  if($("previewTitle"))$("previewTitle").textContent=d.name;
  if($("previewStatus"))$("previewStatus").textContent=`${docKind(d)} · ${(d.size/1024).toFixed(1)} Ko`;
  const kind=docKind(d);
  
  let actions = "";
  if(kind==="PDF"){
    actions += `<button class="text-xs bg-[#273540] text-white px-3 py-1 rounded-lg hover:opacity-90 transition-colors ml-2" onclick="extractCollaboratorsFromPdf(${state.ux.selectedDocumentIndex})">Extraire Collaborateurs (IA)</button>`;
    actions += `<button class="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg hover:bg-slate-200 transition-colors ml-2" onclick="openPdfInNewTab(${state.ux.selectedDocumentIndex})">Ouvrir dans un onglet</button>`;
  }
  
  // Generic edit button for text/office docs
  if(["Word", "Excel", "PowerPoint", "CSV", "Texte"].includes(kind) || kind === "PDF"){
      actions += `<button class="text-xs bg-slate-50 text-[#273540] px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors ml-2 font-bold" onclick="openDocumentEditor(${state.ux.selectedDocumentIndex})">Éditer / Modifier</button>`;
  }

  if($("previewStatus")) $("previewStatus").innerHTML = `${kind} · ${(d.size/1024).toFixed(1)} Ko ${actions}`;
  
  if(kind==="PDF"){
    $("documentPreviewBody").innerHTML=`<div id="pdfViewerContainer" class="pdf-viewer-scroll">
      <div class="pdf-loading">Chargement du PDF...</div>
    </div>`;
    renderPdfToContainer(d.src, "pdfViewerContainer");
  }else if(kind==="CSV"||kind==="Texte"){
    $("documentPreviewBody").innerHTML=`<pre style="padding: 1rem; font-size: 11px; max-height: 100%; overflow: auto;">${esc(String(d.src).slice(0,6000))}</pre>`;
  }else if(kind==="Excel"){
     $("documentPreviewBody").innerHTML=`<div id="excelPreviewContainer" style="padding: 1rem; font-size: 11px; max-height: 100%; overflow: auto;">Chargement de l'aperçu Excel...</div>`;
     renderExcelToContainer(d.src, "excelPreviewContainer");
  }else if(kind==="Word"){
     $("documentPreviewBody").innerHTML=`<div id="wordPreviewContainer" style="padding: 2rem; background: white; color: black; font-size: 12px; max-height: 100%; overflow: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin: 1rem;">Chargement de l'aperçu Word...</div>`;
     renderWordToContainer(d.src, "wordPreviewContainer");
  }else{
    $("documentPreviewBody").innerHTML=`<div class="unified-document-placeholder"><strong>${kind}</strong><br>Aperçu non disponible pour ce format. Utilisez le bouton Éditer pour extraire et modifier.</div>`;
  }
  setTimeout(renderAnnotationOverlay,0);
}
function renderExcelToContainer(src, containerId) {
  if (!window.XLSX) {
    document.getElementById(containerId).innerHTML = "Librairie XLSX non chargée.";
    return;
  }
  try {
    const data = src.split(',')[1];
    const workbook = XLSX.read(data, {type: 'base64'});
    const html = XLSX.utils.sheet_to_html(workbook.Sheets[workbook.SheetNames[0]]);
    document.getElementById(containerId).innerHTML = html;
  } catch(e) {
    document.getElementById(containerId).innerHTML = "Erreur de lecture Excel.";
  }
}

function renderWordToContainer(src, containerId) {
  if (!window.mammoth) {
    document.getElementById(containerId).innerHTML = "Librairie Mammoth non chargée.";
    return;
  }
  try {
    const data = src.split(',')[1];
    const binaryString = window.atob(data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    mammoth.convertToHtml({arrayBuffer: bytes.buffer})
      .then(function(result){
        document.getElementById(containerId).innerHTML = result.value;
      })
      .catch(function(err){
        document.getElementById(containerId).innerHTML = "Erreur de lecture Word.";
      });
  } catch(e) {
    document.getElementById(containerId).innerHTML = "Erreur de décodage base64.";
  }
}

function openDocumentEditor(index) {
  const d = state.documents[index];
  const kind = docKind(d);
  const c = $("documentPreviewBody");
  
  const editUI = (content, formatMsg) => {
    c.innerHTML = `
      <div style="padding: 1rem; height: 100%; display: flex; flex-direction: column; background: #fbfcfe;">
        <h3 style="margin-bottom: 0.5rem; font-size: 14px;">Édition - ${esc(d.name)}</h3>
        <p style="font-size: 10px; color: #666; margin-bottom: 0.5rem;">${formatMsg}</p>
        <textarea id="docEditTextarea" style="flex: 1; margin-bottom: 0.5rem; font-family: monospace; font-size: 12px; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"></textarea>
        <div style="display: flex; gap: 0.5rem;">
          <button onclick="saveDocumentEdits(${index})" class="bg-[#273540] text-white px-4 py-2 rounded-lg font-bold hover:opacity-90">Sauvegarder</button>
          <button onclick="renderDocumentPreview()" class="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300">Annuler</button>
        </div>
      </div>
    `;
    $("docEditTextarea").value = content;
  };

  if (kind === "Excel") {
    if(!window.XLSX){ toast("Librairie manquante"); return; }
    const data = d.src.split(',')[1];
    const workbook = XLSX.read(data, {type: 'base64'});
    const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
    editUI(csv, "Édition de la première feuille (format CSV). Sera reconvertie en Excel.");
  } else if (kind === "Word") {
    if(!window.mammoth){ toast("Librairie manquante"); return; }
    const data = d.src.split(',')[1];
    const binaryString = window.atob(data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    mammoth.extractRawText({arrayBuffer: bytes.buffer}).then(result => {
      editUI(result.value, "Texte brut extrait. L'enregistrement convertira ce document en fichier TXT simple.");
    }).catch(err => { toast("Erreur de lecture Word."); });
  } else if (kind === "CSV" || kind === "Texte") {
    const dataText = kind === "CSV" ? atob(d.src.split(',')[1] || btoa(d.src)) : (d.src.includes(',') ? atob(d.src.split(',')[1]) : d.src);
    editUI(dataText, "Édition directe du texte brut.");
  } else if (kind === "PowerPoint" || kind === "PDF") {
    toast("L'édition de " + kind + " n'est pas possible en mode brut. Le document reste en lecture.");
  } else {
    toast("Format non pris en charge pour l'édition.");
  }
}

function saveDocumentEdits(index) {
  const d = state.documents[index];
  const kind = docKind(d);
  const val = $("docEditTextarea").value;
  
  apply(() => {
    if (kind === "Excel") {
      const workbook = XLSX.read(val, {type: 'string'});
      const b64 = XLSX.write(workbook, {type: 'base64', bookType: 'xlsx'});
      d.src = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + b64;
    } else if (kind === "CSV" || kind === "Texte") {
      const mime = kind === "CSV" ? "text/csv" : "text/plain";
      d.src = `data:${mime};base64,${btoa(unescape(encodeURIComponent(val)))}`;
    } else if (kind === "Word") {
      d.src = `data:text/plain;base64,${btoa(unescape(encodeURIComponent(val)))}`;
      d.name = d.name.replace(/\.docx?$/i, ".txt");
    }
    toast("Document sauvegardé.");
  });
  renderDocumentPreview();
}

function setPreviewMode(mode){
  const docMode=mode==="document";
  if($("signaturePreview"))$("signaturePreview").hidden=docMode;
  if($("documentPreviewBody"))$("documentPreviewBody").hidden=!docMode;
  if($("previewWrap"))$("previewWrap").classList.toggle("document-mode", docMode);
  if(docMode){
    renderDocumentPreview();
  }else{
    if($("previewTitle"))$("previewTitle").textContent="Aperçu";
    if($("previewStatus"))$("previewStatus").textContent=`${state.canvas.width}×${state.canvas.height}`;
    fitPreview();
  }
}
function qualityReportData(){
  const issues=[];
  const warnings=[];
  if(!state.identity.firstName&&!state.collaborators.length)warnings.push("Aucun prénom renseigné ou collaborateur importé.");
  if(!state.identity.lastName&&!state.collaborators.length)warnings.push("Aucun nom renseigné ou collaborateur importé.");
  if(!state.identity.email&&!state.collaborators.length)warnings.push("Aucun email renseigné ou collaborateur importé.");
  if(!state.logo.src)warnings.push("Aucun logo importé.");
  if(state.canvas.width>1000)warnings.push("Grand format : privilégier PNG/JPEG pour Outlook.");
  if(state.assets.length>15)warnings.push("Bibliothèque assez chargée : penser aux tags/favoris.");
  const collabWarnings=state.collaborators.flatMap((c,i)=>collaboratorIssues(c).map(x=>`Ligne ${i+1} : ${x}`));
  warnings.push(...collabWarnings);
  const html=getEmailHtml();
  const weight=(new Blob([html]).size/1024);
  if(weight>100)warnings.push("HTML lourd, risque de compatibilité email.");
  
  // Category Scores
  const idFields = ["firstName", "lastName", "jobTitle", "email", "phone"];
  const filledIdFields = idFields.filter(f => !!state.identity[f]).length;
  const identityScore = Math.round((filledIdFields / idFields.length) * 100);
  
  const ragtColors = ["#273540", "#90b9d4", "#ecc764", "#6ba56f", "#98af5f"];
  const designScore = (!!state.logo.src ? 50 : 0) + (ragtColors.includes(state.design.bg1) ? 25 : 0) + (ragtColors.includes(state.design.accent) ? 25 : 0);
  
  const accessibilityScore = state.design.motifOpacity < 0.5 ? 90 : 60; // Simplified
  const seoScore = (!!state.identity.website ? 40 : 0) + (!!state.identity.linkedin ? 30 : 0) + (!!state.identity.email ? 30 : 0);
  const performanceScore = Math.max(0, 100 - weight);

  const score=Math.max(0,100-(issues.length*25)-(warnings.length*6));
  
  return {
    issues, warnings, score, weight,
    categories: [
      { axis: "Identité", value: identityScore },
      { axis: "Design", value: designScore },
      { axis: "Accessibilité", value: accessibilityScore },
      { axis: "SEO", value: seoScore },
      { axis: "Performance", value: performanceScore }
    ]
  };
}

function renderQualityRadarChart(data) {
  const container = $("qualityRadarChart");
  if (!container) return;
  container.innerHTML = "";

  if (typeof d3 === "undefined") {
    container.innerHTML = '<div class="quality-empty">Graphique indisponible : D3 non charge.</div>';
    return;
  }

  const margin = { top: 50, right: 80, bottom: 50, left: 80 };
  const availableWidth = Math.max(360, container.clientWidth || 0);
  const width = Math.max(220, Math.min(500, availableWidth - margin.left - margin.right));
  const height = Math.max(180, Math.min(width, 300 - margin.top - margin.bottom));
  
  const radarData = data.map(d => ({ axis: d.axis, value: d.value / 100 }));
  const total = radarData.length;
  const radius = Math.min(width / 2, height / 2);
  const angleSlice = (Math.PI * 2) / total;

  const svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${(width / 2) + margin.left}, ${(height / 2) + margin.top})`);

  // Grid levels
  const levels = 5;
  for (let j = 0; j < levels; j++) {
    const levelFactor = radius * ((j + 1) / levels);
    svg.selectAll(".levels")
      .data(radarData)
      .enter()
      .append("line")
      .attr("x1", (d, i) => levelFactor * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y1", (d, i) => levelFactor * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("x2", (d, i) => levelFactor * Math.cos(angleSlice * (i + 1) - Math.PI / 2))
      .attr("y2", (d, i) => levelFactor * Math.sin(angleSlice * (i + 1) - Math.PI / 2))
      .style("stroke", "#e2e8f0")
      .style("stroke-width", "1px");
  }

  // Axis lines
  const axis = svg.selectAll(".axis")
    .data(radarData)
    .enter()
    .append("g")
    .attr("class", "axis");

  axis.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
    .attr("y2", (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
    .style("stroke", "#cbd5e1")
    .style("stroke-width", "1px");

  // Labels
  axis.append("text")
    .attr("class", "legend")
    .style("font-size", "11px")
    .style("font-weight", "bold")
    .style("fill", "#64748b")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr("x", (d, i) => (radius + 20) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr("y", (d, i) => (radius + 20) * Math.sin(angleSlice * i - Math.PI / 2))
    .text(d => d.axis);

  // The Radar area
  const radarLine = d3.lineRadial()
    .radius(d => d.value * radius)
    .angle((d, i) => i * angleSlice)
    .curve(d3.curveLinearClosed);

  svg.append("path")
    .datum(radarData)
    .attr("d", radarLine)
    .style("fill", "#ecc764")
    .style("fill-opacity", 0.3)
    .style("stroke", "#ecc764")
    .style("stroke-width", "3px");

  // Data points
  svg.selectAll(".nodes")
    .data(radarData)
    .enter()
    .append("circle")
    .attr("r", 4)
    .attr("cx", (d, i) => d.value * radius * Math.cos(angleSlice * i - Math.PI / 2))
    .attr("cy", (d, i) => d.value * radius * Math.sin(angleSlice * i - Math.PI / 2))
    .style("fill", "#ecc764")
    .style("stroke", "#fff")
    .style("stroke-width", "2px");
}

function renderQualityPanel(){
  if(!$("qualityReportPanel"))return;
  const q=qualityReportData();
  $("qualityScore").textContent=q.score+"%";
  $("qualityErrors").textContent=q.issues.length;
  $("qualityWarningsPanel").textContent=q.warnings.length;
  $("qualityWeight").textContent=q.weight.toFixed(1)+" Ko";
  
  if ($("qualityRadarChart")) {
    renderQualityRadarChart(q.categories);
  }

  $("qualityReportPanel").innerHTML=`<div class="${q.issues.length?'ko':'ok'}">${q.issues.length?'Erreurs détectées':'Aucune erreur bloquante'}</div>
    <br><strong>Alertes</strong><br>${q.warnings.length?q.warnings.map(w=>`<div class="warn">• ${esc(w)}</div>`).join(""):'<div class="ok">Aucune alerte importante.</div>'}
    <br><strong>Conseils</strong><br>
    <div>• HTML pour signatures cliquables.</div>
    <div>• PNG/JPEG pour rendu graphique fidèle.</div>
    <div>• Mode charte verrouillée avant diffusion entreprise.</div>`;
}
function exportQualityPanel(){
  const q=qualityReportData();
  download("rapport-qualite-v34.json",JSON.stringify(q,null,2),"application/json");
}


function allPdfTools(){
  return pdfTools.flatMap(cat=>cat.tools.map(tool=>({...tool,categoryId:cat.id,categoryLabel:cat.label})));
}
function selectedTool(){
  return allPdfTools().find(t=>t.id===state.tools.selectedTool) || allPdfTools()[0] || null;
}
function renderTools(){
  if(!$("toolsGrid")) return;
  const categories=pdfTools || [];
  $("toolsCategories").innerHTML=categories.map(cat=>`<button class="tool-cat ${state.tools.selectedCategory===cat.id?"active":""}" data-tool-cat="${cat.id}">${esc(cat.label)}</button>`).join("");
  document.querySelectorAll("[data-tool-cat]").forEach(b=>b.onclick=()=>apply(()=>{state.tools.selectedCategory=b.dataset.toolCat;},false));

  const q=($("toolSearch")?.value || state.tools.search || "").toLowerCase();
  const status=$("toolStatusFilter")?.value || state.tools.statusFilter || "all";
  let list=allPdfTools().filter(t=>state.tools.selectedCategory==="all" || t.categoryId===state.tools.selectedCategory);
  list=list.filter(t=>(!q || (t.name+" "+t.description+" "+t.categoryLabel).toLowerCase().includes(q)) && (status==="all" || t.status===status));
  $("toolsGrid").innerHTML=list.map(t=>`<div class="tool-card ${state.tools.selectedTool===t.id?"active":""}" data-tool="${t.id}">
    <strong>${esc(t.name)}</strong>
    <p>${esc(t.description)}</p>
    <span class="tool-status" data-status="${esc(t.status)}">${esc(t.status)}</span>
  </div>`).join("");
  document.querySelectorAll("[data-tool]").forEach(b=>b.onclick=()=>apply(()=>{state.tools.selectedTool=b.dataset.tool;},false));
  renderToolDetail();
  renderWorkflow();
}
function renderToolDetail(){
  if(!$("toolDetailName")) return;
  const t=selectedTool();
  if(!t){
    $("toolDetailName").textContent="Aucun outil";
    $("toolDetailStatus").textContent="";
    $("toolDetailBody").innerHTML="<p>Aucun outil disponible.</p>";
    return;
  }
  $("toolDetailName").textContent=t.name;
  $("toolDetailStatus").textContent=`${t.categoryLabel} · ${t.status}`;
  
  const doc = state.documents[state.ux.selectedDocumentIndex];
  let docSelector = "";
  if (state.documents.length > 1) {
    docSelector = `<div class="mb-4">
      <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Document cible</label>
      <select id="toolDocSelector" class="w-full text-xs p-2 rounded-lg border border-slate-200">
        ${state.documents.map((d, i) => `<option value="${i}" ${i === state.ux.selectedDocumentIndex ? "selected" : ""}>${esc(d.name)}</option>`).join("")}
      </select>
    </div>`;
  }

  let previewWarning = "";
  if (doc && docKind(doc) === "PDF") {
    previewWarning = `<div class="bg-[#f0f9ff] p-3 rounded-lg text-[10px] text-[#273540] mb-4 flex items-center gap-2">
      <span class="font-bold">Aperçu PDF actif</span>
      <span>${esc(doc.name)} est affiché.</span>
    </div>`;
    renderDocumentPreview();
  }

  const engineNote = t.level.includes("server") 
    ? "Nécessite un moteur serveur ou une librairie spécialisée pour une version réellement fiable."
    : t.level.includes("api")
      ? "Prévu pour API ou moteur IA."
      : "Peut être partiellement traité localement dans le navigateur.";
  
  $("toolDetailBody").innerHTML=`${docSelector}${previewWarning}
    <p class="text-sm mb-4">${esc(t.description)}</p>
    <div class="grid grid-cols-2 gap-4 text-[10px] bg-slate-50 p-3 rounded-xl border border-slate-100">
      <div><strong>Catégorie :</strong><br>${esc(t.categoryLabel)}</div>
      <div><strong>Niveau :</strong><br>${esc(t.level)}</div>
      <div><strong>État :</strong><br>${esc(t.status)}</div>
      <div><strong>Moteur :</strong><br>${t.level.includes("server")?"Cloud":"Local"}</div>
    </div>
    <div class="mt-4 p-3 border-l-2 border-gold bg-amber-50 text-[10px] text-amber-800">
      <strong>Note :</strong> ${esc(engineNote)}
    </div>`;

  if ($("toolDocSelector")) {
    $("toolDocSelector").onchange = (e) => apply(() => {
      state.ux.selectedDocumentIndex = +e.target.value;
      renderToolDetail();
    }, false);
  }
}

function toolNeedsBackend(t){
  return /server|api|ocr|libreoffice/i.test(t.level||"");
}
function toolRequirements(t){
  const level=String(t.level||"").toLowerCase();
  const req=[];
  if(level.includes("server")) req.push("Backend actif ou export de fiche technique pour traitement serveur.");
  if(level.includes("api")) req.push("Connecteur API configure dans API et Connecteurs.");
  if(level.includes("ocr")) req.push("Moteur OCR pour les PDF scannes ou images.");
  if(level.includes("libreoffice")) req.push("Worker LibreOffice cote serveur pour convertir les fichiers Office.");
  if(["merge-pdf","split-pdf","remove-pages","extract-pages","organize-pdf","compress-pdf","repair-pdf","ocr-pdf","pdf-to-word","pdf-to-powerpoint","pdf-to-excel","pdf-to-pdfa","unlock-pdf","protect-pdf","redact-pdf","compare-pdf"].includes(t.id)) req.push("Document PDF cible importe dans Publipostage.");
  if(["jpg-to-pdf","scan-to-pdf"].includes(t.id)) req.push("Images disponibles dans la Bibliotheque ou importees dans Documents.");
  if(!req.length) req.push("Traitement local possible depuis le navigateur.");
  return req;
}
function createToolRun(t){
  const doc=state.documents[state.ux.selectedDocumentIndex];
  const needsBackend=toolNeedsBackend(t);
  return {
    id:"tool_run_"+Date.now(),
    toolId:t.id,
    name:t.name,
    category:t.categoryLabel,
    level:t.level,
    status:needsBackend?"pret a connecter":"pret local",
    requiresBackend:needsBackend,
    document:doc?{name:doc.name,type:docKind(doc),size:doc.size}:null,
    requirements:toolRequirements(t),
    steps:[
      "Verifier le document cible et le format attendu.",
      needsBackend?"Envoyer la fiche au backend ou activer le connecteur requis.":"Executer le traitement local depuis le module Documents.",
      "Exporter le resultat et conserver le rapport dans le projet."
    ],
    createdAt:new Date().toISOString()
  };
}
function renderToolRunPanel(t,run){
  if(!$('toolDetailBody'))return;
  $('toolDetailBody').innerHTML=`
    <div class="tool-run-panel ${run.requiresBackend?'needs-backend':'ready'}">
      <div class="tool-run-head">
        <div><span>Execution preparee</span><strong>${esc(run.name)}</strong></div>
        <em>${esc(run.status)}</em>
      </div>
      <div class="tool-run-grid">
        <div><span>Document</span><strong>${esc(run.document?.name||'Aucun document selectionne')}</strong></div>
        <div><span>Moteur</span><strong>${run.requiresBackend?'Backend / API':'Local navigateur'}</strong></div>
        <div><span>Niveau</span><strong>${esc(run.level)}</strong></div>
        <div><span>Categorie</span><strong>${esc(run.category)}</strong></div>
      </div>
      <div class="tool-run-list"><strong>Prerequis</strong><ul>${run.requirements.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="tool-run-list"><strong>Etapes</strong><ul>${run.steps.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="tool-run-actions">
        <button id="toolRunOpenDocumentsBtn">Ouvrir Documents</button>
        <button id="toolRunAddWorkflowBtn" class="secondary">Ajouter au workflow</button>
        <button id="toolRunExportBtn" class="secondary">Exporter fiche</button>
      </div>
    </div>`;
  if($('toolRunOpenDocumentsBtn'))$('toolRunOpenDocumentsBtn').onclick=()=>showView('documents');
  if($('toolRunAddWorkflowBtn'))$('toolRunAddWorkflowBtn').onclick=()=>addSelectedToolToWorkflow();
  if($('toolRunExportBtn'))$('toolRunExportBtn').onclick=()=>exportPreparedToolRun(run.id);
}
function prepareSelectedPdfTool(t){
  const run=createToolRun(t);
  apply(()=>{
    state.tools.runs.unshift(run);
    state.tools.runs=state.tools.runs.slice(0,30);
    state.tools.selectedRunId=run.id;
  },false);
  renderToolRunPanel(t,run);
  toast("Execution preparee.");
}
function exportPreparedToolRun(runId=state.tools.selectedRunId){
  const run=(state.tools.runs||[]).find(x=>x.id===runId) || createToolRun(selectedTool());
  download("fiche-outil-pdf-"+safeFileName(run.name||run.toolId)+".json",JSON.stringify({version:"34.1",run,backend:state.backend,connector:state.connector},null,2),"application/json");
}
async function extractTextFromPdfDocument(doc){
  if(!window.pdfjsLib) return "";
  const pdf=await pdfjsLib.getDocument(doc.src).promise;
  const chunks=[];
  const maxPages=Math.min(pdf.numPages,12);
  for(let pageNum=1;pageNum<=maxPages;pageNum++){
    const page=await pdf.getPage(pageNum);
    const content=await page.getTextContent();
    chunks.push(content.items.map(item=>item.str||"").join(" "));
  }
  return chunks.join(" ").replace(/\s+/g," ").trim();
}
async function documentPlainText(doc){
  if(!doc)return "";
  const kind=docKind(doc);
  if(kind==="PDF")return await extractTextFromPdfDocument(doc);
  let text=String(doc.src||"");
  if(text.startsWith("data:")){
    const payload=text.split(",")[1]||"";
    try{text=decodeURIComponent(escape(atob(payload)));}
    catch(e){try{text=atob(payload);}catch{}}
  }
  return text.replace(/\s+/g," ").trim();
}

function runSelectedTool(){
  const t=selectedTool();
  if(!t) return toast("Aucun outil selectionne.");
  if(t.id==="ai-summarizer") return runLocalSummarizer();
  if(t.id==="workflow-builder") return exportPdfWorkflow();
  if(["rotate-pdf","watermark","page-numbers","pdf-to-jpg"].includes(t.id)){
    showView("documents");
    apply(()=>state.pdfEngine.open=true,false);
    toast("Moteur PDF local ouvert dans Documents.");
    return;
  }
  if(t.id==="sign-pdf"){
    showView("documents");
    apply(()=>state.signer.open=true,false);
    toast("Module signature visuelle ouvert dans Documents.");
    return;
  }
  prepareSelectedPdfTool(t);
}
function addSelectedToolToWorkflow(){
  const t=selectedTool();
  if(!t) return;
  apply(()=>{
    state.tools.workflow.push({id:t.id,name:t.name,category:t.categoryLabel,status:t.status,createdAt:new Date().toISOString()});
  },false);
  toast("Outil ajouté au workflow.");
}
function renderWorkflow(){
  if(!$("workflowPreview")) return;
  $("workflowPreview").textContent = state.tools.workflow.length
    ? state.tools.workflow.map((s,i)=>`${i+1}. ${s.name}`).join(" → ")
    : "Aucune étape";
}
function exportPdfWorkflow(){
  const data={version:"22.0",workflow:state.tools.workflow,project:"Signature Studio"};
  download("workflow-outils-pdf-v22.json",JSON.stringify(data,null,2),"application/json");
}
async function runLocalSummarizer(){
  const doc=state.documents[state.ux.selectedDocumentIndex];
  if(!doc) return toast("Importe ou selectionne un document d'abord.");
  const kind=docKind(doc);
  try{
    const text=await documentPlainText(doc);
    const words=text.split(" ").filter(Boolean);
    const summary=words.slice(0,110).join(" ") + (words.length>110 ? "..." : "");
    const sourceNote=kind==="PDF"?"Texte extrait via PDF.js. Les PDF scannes exigent encore un OCR backend.":"Texte lu localement dans le navigateur.";
    $("toolDetailBody").innerHTML=`<div class="tool-run-panel ready"><div class="tool-run-head"><div><span>Resume local</span><strong>${esc(doc.name)}</strong></div><em>${esc(kind)}</em></div><p>${esc(summary || "Aucun texte lisible dans ce document.")}</p><div class="tool-run-grid"><div><span>Mots analyses</span><strong>${words.length}</strong></div><div><span>Source</span><strong>${esc(sourceNote)}</strong></div></div></div>`;
  }catch(e){
    $("toolDetailBody").innerHTML=`<div class="tool-run-panel needs-backend"><div class="tool-run-head"><div><span>Resume impossible localement</span><strong>${esc(doc.name)}</strong></div><em>${esc(kind)}</em></div><p>${esc(e.message||"Lecture impossible")}</p><div class="tool-run-list"><strong>Suite utile</strong><ul><li>Ajouter ce document au workflow OCR.</li><li>Activer un backend OCR/API pour les PDF scannes.</li></ul></div></div>`;
  }
}
function bindTools(){
  if($("toolSearch")) $("toolSearch").oninput=()=>{state.tools.search=$("toolSearch").value;renderTools();};
  if($("toolStatusFilter")) $("toolStatusFilter").onchange=()=>{state.tools.statusFilter=$("toolStatusFilter").value;renderTools();};
  if($("runToolBtn")) $("runToolBtn").onclick=()=>runSelectedTool();
  if($("addToolWorkflowBtn")) $("addToolWorkflowBtn").onclick=()=>addSelectedToolToWorkflow();
  if($("exportWorkflowBtn")) $("exportWorkflowBtn").onclick=()=>exportPdfWorkflow();
}


function makeAnnotation(type){
  const color=$("annotationColor")?.value || "#273540";
  const page=Number($("annotationPage")?.value||1);
  const value=($("annotationTextValue")?.value||"").trim();
  const stamp=$("stampType")?.value||"APPROUVÉ";
  const id="ann_"+Date.now()+"_"+Math.floor(Math.random()*999);
  const base={id,type,page,x:70+state.signer.annotations.length*16,y:55+state.signer.annotations.length*14,w:160,h:42,color,createdAt:new Date().toISOString()};
  if(type==="signature"){
    base.value=state.signer.signatureImage || "";
    base.label="Signature";
    base.w=180;base.h=60;
  }else if(type==="text"){
    base.value=value||"Texte";
    base.label="Texte";
  }else if(type==="date"){
    base.value=value||new Date().toLocaleDateString("fr-FR");
    base.label="Date";
    base.w=120;base.h=32;
  }else if(type==="stamp"){
    base.value=value||stamp;
    base.label="Tampon";
    base.w=150;base.h=38;
  }else if(type==="initials"){
    base.value=value||((state.identity.firstName?.[0]||"G")+(state.identity.lastName?.[0]||"A")).toUpperCase();
    base.label="Paraphe";
    base.w=80;base.h=34;
  }else if(type==="checkbox"){
    base.value="✓";
    base.label="Case cochée";
    base.w=32;base.h=32;
  }
  apply(()=>{
    state.signer.annotations.push(base);
    state.signer.selectedAnnotationId=id;
  });
}
function renderAnnotations(){
  if($("signerPanel")) $("signerPanel").classList.toggle("closed",!state.signer.open);
  if($("annotationCount")) $("annotationCount").textContent=`${state.signer.annotations.length} élément${state.signer.annotations.length>1?"s":""}`;
  if($("annotationList")){
    $("annotationList").innerHTML=state.signer.annotations.length?state.signer.annotations.map(a=>`<div class="annotation-item ${state.signer.selectedAnnotationId===a.id?"active":""}">
      <div><strong>${esc(a.label||a.type)}</strong><span>Page ${a.page} · ${Math.round(a.x)}, ${Math.round(a.y)}</span></div>
      <button data-del-ann="${a.id}" class="danger">X</button>
    </div>`).join(""):`<div class="annotation-item"><div><strong>Aucune annotation</strong><span>Ajoute signature, date ou tampon</span></div></div>`;
    document.querySelectorAll("[data-del-ann]").forEach(b=>b.onclick=()=>apply(()=>{state.signer.annotations=state.signer.annotations.filter(a=>a.id!==b.dataset.delAnn);}));
  }
  renderAnnotationOverlay();
}
function renderAnnotationOverlay(){
  const body=$("documentPreviewBody");
  if(!body)return;
  let stage=body.querySelector(".annotation-overlay-stage");
  if(!stage){
    stage=document.createElement("div");
    stage.className="annotation-overlay-stage";
    body.appendChild(stage);
  }
  stage.innerHTML=state.signer.annotations.map(a=>annotationHtml(a)).join("");
  stage.querySelectorAll(".annotation-visual").forEach(el=>{
    el.onmousedown=e=>{
      e.preventDefault();
      const id=el.dataset.annotationId;
      state.signer.selectedAnnotationId=id;
      const ann=state.signer.annotations.find(a=>a.id===id);
      if(!ann)return;
      const startX=e.clientX,startY=e.clientY,ox=ann.x,oy=ann.y;
      const move=ev=>{
        ann.x=Math.max(0,ox+(ev.clientX-startX));
        ann.y=Math.max(0,oy+(ev.clientY-startY));
        el.style.left=ann.x+"px";
        el.style.top=ann.y+"px";
      };
      const up=()=>{
        document.removeEventListener("mousemove",move);
        document.removeEventListener("mouseup",up);
        autoSave();
        renderAnnotations();
      };
      document.addEventListener("mousemove",move);
      document.addEventListener("mouseup",up);
    };
  });
}
function annotationHtml(a){
  const selected=state.signer.selectedAnnotationId===a.id?"selected":"";
  let inner=esc(a.value||"");
  let cls=a.type;
  if(a.type==="signature"){
    inner=a.value?`<img src="${a.value}" alt="Signature">`:`<span>Signature</span>`;
  }
  return `<div class="annotation-visual ${cls} ${selected}" data-annotation-id="${a.id}" style="left:${a.x}px;top:${a.y}px;width:${a.w}px;min-height:${a.h}px;color:${a.color};">${inner}</div>`;
}
function setupSignaturePad(){
  const canvas=$("signaturePad");
  if(!canvas)return;
  const ctx=canvas.getContext("2d");
  ctx.lineWidth=3;
  ctx.lineCap="round";
  ctx.strokeStyle="#273540";
  let drawing=false;
  const pos=e=>{
    const r=canvas.getBoundingClientRect();
    const x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;
    const y=(e.touches?e.touches[0].clientY:e.clientY)-r.top;
    return {x:x*(canvas.width/r.width),y:y*(canvas.height/r.height)};
  };
  const start=e=>{e.preventDefault();drawing=true;};
}
function initSignaturePad(){
  const canvas=$("signaturePad");
  if(!canvas)return;
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#ffffff";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.lineWidth=4;
  ctx.lineCap="round";
  ctx.strokeStyle="#273540";
  let drawing=false;
  const get=(e)=>{
    const r=canvas.getBoundingClientRect();
    const p=e.touches?e.touches[0]:e;
    return {x:(p.clientX-r.left)*(canvas.width/r.width),y:(p.clientY-r.top)*(canvas.height/r.height)};
  };
  const down=e=>{e.preventDefault();drawing=true;const p=get(e);ctx.beginPath();ctx.moveTo(p.x,p.y);};
  const move=e=>{if(!drawing)return;e.preventDefault();const p=get(e);ctx.lineTo(p.x,p.y);ctx.stroke();};
  const up=()=>{drawing=false;};
  canvas.onmousedown=down;canvas.onmousemove=move;canvas.onmouseup=up;canvas.onmouseleave=up;
  canvas.ontouchstart=down;canvas.ontouchmove=move;canvas.ontouchend=up;
}
function saveSignaturePad(){
  const canvas=$("signaturePad");
  if(!canvas)return;
  apply(()=>{state.signer.signatureImage=canvas.toDataURL("image/png");},false);
}
function exportAnnotationPlan(){
  const doc=state.documents[state.ux.selectedDocumentIndex] || null;
  const plan={
    version:"23.0",
    type:"visual-signature-plan",
    legalNote:"Signature visuelle uniquement, non qualifiée.",
    document:doc?{name:doc.name,type:doc.type,size:doc.size}:null,
    annotations:state.signer.annotations,
    exportedAt:new Date().toISOString()
  };
  download("plan-signature-visuelle-v23.json",JSON.stringify(plan,null,2),"application/json");
}
function renderDocumentPreviewWithAnnotations(){
  renderDocumentPreview();
  renderAnnotations();
}


function syncPdfEngineControls(){
  if(!$("pdfEnginePanel"))return;
  $("pdfEnginePanel").classList.toggle("closed",!state.pdfEngine.open);
  if($("pdfRotation"))$("pdfRotation").value=String(state.pdfEngine.rotation||0);
  if($("pdfWatermarkText"))$("pdfWatermarkText").value=state.pdfEngine.watermark||"";
  if($("pdfWatermarkOpacity"))$("pdfWatermarkOpacity").value=state.pdfEngine.watermarkOpacity;
  if($("pdfWatermarkOpacityLabel"))$("pdfWatermarkOpacityLabel").textContent=state.pdfEngine.watermarkOpacity;
  if($("pdfShowPageNumbers"))$("pdfShowPageNumbers").checked=!!state.pdfEngine.showPageNumbers;
  if($("pdfIncludeAnnotations"))$("pdfIncludeAnnotations").checked=!!state.pdfEngine.includeAnnotations;
  if($("pdfUseDocumentAsBackground"))$("pdfUseDocumentAsBackground").checked=!!state.pdfEngine.useDocumentAsBackground;
  if($("pdfFinalFormat"))$("pdfFinalFormat").value=state.pdfEngine.finalFormat||"a4-portrait";
  if($("pdfFinalQuality"))$("pdfFinalQuality").value=state.pdfEngine.finalQuality;
  if($("pdfFinalQualityLabel"))$("pdfFinalQualityLabel").textContent=state.pdfEngine.finalQuality;
}
function selectedDocument(){
  return state.documents[state.ux.selectedDocumentIndex] || null;
}
function loadImageAsync(src){
  return new Promise(resolve=>{
    if(!src)return resolve(null);
    const img=new Image();
    img.onload=()=>resolve(img);
    img.onerror=()=>resolve(null);
    img.src=src;
  });
}
async function renderPdfEngineCanvas(){
  const canvas=$("pdfEngineCanvas");
  if(!canvas)return;
  const ctx=canvas.getContext("2d");
  const rotation=Number(state.pdfEngine.rotation||0);
  const portrait=rotation===90 || rotation===270 ? false : true;
  canvas.width=portrait?840:1188;
  canvas.height=portrait?1188:840;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#ffffff";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  const doc=selectedDocument();
  await drawPdfDocumentBase(ctx,canvas,doc);
  drawPdfEngineWatermark(ctx,canvas);
  if(state.pdfEngine.includeAnnotations) await drawPdfAnnotations(ctx,canvas);
  if(state.pdfEngine.showPageNumbers) drawPageNumbers(ctx,canvas);
  state.pdfEngine.lastRenderAt=new Date().toISOString();
  renderPdfEngineReport();
  autoSave();
}
async function drawPdfDocumentBase(ctx,canvas,doc){
  if(!doc || !state.pdfEngine.useDocumentAsBackground){
    drawPdfPlaceholder(ctx,canvas,doc);
    return;
  }
  const kind=docKind(doc);
  if(doc.src && String(doc.src).startsWith("data:image")){
    const img=await loadImageAsync(doc.src);
    if(img){
      fitDrawImage(ctx,img,50,70,canvas.width-100,canvas.height-140);
      return;
    }
  }
  if(kind==="CSV" || kind==="Texte"){
    ctx.fillStyle="#f8fafc";
    ctx.fillRect(50,70,canvas.width-100,canvas.height-140);
    ctx.fillStyle="#273540";
    ctx.font="22px Arial";
    ctx.fillText(doc.name,70,110);
    ctx.fillStyle="#334155";
    ctx.font="16px Arial";
    wrapText(ctx,String(doc.src||"").slice(0,1800),70,150,canvas.width-140,24);
    return;
  }
  drawPdfPlaceholder(ctx,canvas,doc);
}
function drawPdfPlaceholder(ctx,canvas,doc){
  ctx.fillStyle="#f8fafc";
  ctx.fillRect(50,70,canvas.width-100,canvas.height-140);
  ctx.strokeStyle="#dce5ee";
  ctx.lineWidth=3;
  ctx.strokeRect(50,70,canvas.width-100,canvas.height-140);
  ctx.fillStyle="#273540";
  ctx.font="bold 28px Arial";
  ctx.fillText(doc?doc.name:"Aucun document",70,120);
  ctx.fillStyle="#64748b";
  ctx.font="18px Arial";
  ctx.fillText(doc?`${docKind(doc)} · aperçu visuel local`:"Importe un PDF, une image, un TXT ou un CSV",70,155);
  ctx.font="16px Arial";
  wrapText(ctx,"Le moteur v24 applique rotation visuelle, filigrane, numérotation et annotations sur un canvas local. La modification binaire réelle du PDF arrive dans les lots suivants.",70,205,canvas.width-140,24);
}
function fitDrawImage(ctx,img,x,y,w,h){
  const r=Math.min(w/img.width,h/img.height);
  const iw=img.width*r, ih=img.height*r;
  ctx.drawImage(img,x+(w-iw)/2,y+(h-ih)/2,iw,ih);
}
function wrapText(ctx,text,x,y,maxWidth,lineHeight){
  const words=String(text||"").split(/\s+/);
  let line="";
  for(const word of words){
    const test=line+word+" ";
    if(ctx.measureText(test).width>maxWidth && line){
      ctx.fillText(line,x,y);
      line=word+" ";
      y+=lineHeight;
      if(y>ctx.canvas.height-90)break;
    }else line=test;
  }
  if(y<=ctx.canvas.height-90)ctx.fillText(line,x,y);
}
function drawPdfEngineWatermark(ctx,canvas){
  const text=state.pdfEngine.watermark||"";
  if(!text || state.pdfEngine.watermarkOpacity<=0)return;
  ctx.save();
  ctx.globalAlpha=Number(state.pdfEngine.watermarkOpacity||0.18);
  ctx.translate(canvas.width/2,canvas.height/2);
  ctx.rotate(-Math.PI/5);
  ctx.fillStyle="#273540";
  ctx.font="bold 72px Arial";
  ctx.textAlign="center";
  ctx.fillText(text,0,0);
  ctx.restore();
}
async function drawPdfAnnotations(ctx,canvas){
  for(const a of state.signer.annotations){
    const x=a.x*1.8+60, y=a.y*1.8+80;
    ctx.save();
    ctx.fillStyle=a.color||"#273540";
    ctx.strokeStyle=a.color||"#273540";
    ctx.lineWidth=3;
    if(a.type==="signature" && a.value){
      const img=await loadImageAsync(a.value);
      if(img)fitDrawImage(ctx,img,x,y,a.w*1.8,a.h*1.8);
      else drawTextAnnotation(ctx,a,x,y);
    }else if(a.type==="stamp"){
      ctx.save();
      ctx.translate(x+70,y+25);
      ctx.rotate(-Math.PI/18);
      ctx.strokeRect(-65,-20,130,40);
      ctx.font="bold 24px Arial";
      ctx.textAlign="center";
      ctx.fillText(a.value||"APPROUVÉ",0,8);
      ctx.restore();
    }else if(a.type==="checkbox"){
      ctx.strokeRect(x,y,28,28);
      ctx.font="bold 28px Arial";
      ctx.fillText("✓",x+3,y+25);
    }else{
      drawTextAnnotation(ctx,a,x,y);
    }
    ctx.restore();
  }
}
function drawTextAnnotation(ctx,a,x,y){
  ctx.font=a.type==="date"?"bold 22px Arial":"bold 24px Arial";
  ctx.fillText(a.value||a.label||a.type,x,y+28);
}
function drawPageNumbers(ctx,canvas){
  ctx.fillStyle="#64748b";
  ctx.font="16px Arial";
  ctx.textAlign="center";
  ctx.fillText("Page 1 / 1",canvas.width/2,canvas.height-34);
  ctx.textAlign="left";
}
function renderPdfEngineReport(){
  if(!$("pdfEngineReport"))return;
  const doc=selectedDocument();
  $("pdfEngineReport").innerHTML=`
    <div><strong>Document :</strong> ${doc?esc(doc.name):"aucun"}</div>
    <div><strong>Rotation :</strong> ${state.pdfEngine.rotation||0}°</div>
    <div><strong>Filigrane :</strong> ${esc(state.pdfEngine.watermark||"aucun")}</div>
    <div><strong>Annotations :</strong> ${state.signer.annotations.length}</div>
    <div><strong>Dernier rendu :</strong> ${state.pdfEngine.lastRenderAt?new Date(state.pdfEngine.lastRenderAt).toLocaleString("fr-FR"):"jamais"}</div>
    <div><strong>Dernier PDF :</strong> ${state.pdfEngine.lastPdfExportAt?new Date(state.pdfEngine.lastPdfExportAt).toLocaleString("fr-FR"):"jamais"}</div>
    <div><strong>Sortie :</strong> PDF final image-based <span class="pdf-output-pill">v25 fonctionnel</span></div>
    <div><strong>Note :</strong> texte non sélectionnable, moteur vectoriel prévu v26+.</div>`;
}
function exportPdfEngineImage(kind="png"){
  const canvas=$("pdfEngineCanvas");
  if(!canvas)return;
  const type=kind==="jpeg"?"image/jpeg":"image/png";
  canvas.toBlob(blob=>download(kind==="jpeg"?"apercu-pdf-v24.jpg":"apercu-pdf-v24.png",blob,type),type,.92);
}
function exportPdfOperationPlan(){
  const doc=selectedDocument();
  const plan={
    version:"24.0",
    type:"pdf-visual-operation-plan",
    legalNote:"Plan visuel local, pas modification PDF binaire réelle.",
    document:doc?{name:doc.name,type:doc.type,size:doc.size,kind:docKind(doc)}:null,
    pdfEngine:state.pdfEngine,
    annotations:state.signer.annotations,
    exportedAt:new Date().toISOString()
  };
  download("plan-operations-pdf-v24.json",JSON.stringify(plan,null,2),"application/json");
}
function printPdfVisual(){
  const canvas=$("pdfEngineCanvas");
  if(!canvas)return;
  const img=canvas.toDataURL("image/png");
  const w=window.open("","_blank");
  if(!w){toast("Popup bloquée par le navigateur.");return;}
  w.document.write(`<!doctype html><html><head><title>Impression PDF visuelle</title><style>
    body{margin:0;background:#f1f5f9;font-family:Arial}
    .page{width:210mm;min-height:297mm;margin:10mm auto;background:white;display:grid;place-items:center;box-shadow:0 0 20px rgba(0,0,0,.15)}
    img{max-width:100%;max-height:297mm}
    @media print{body{background:white}.page{margin:0;box-shadow:none;page-break-after:always}}
  </style></head><body><div class="page"><img src="${img}"></div><script>setTimeout(()=>window.print(),500)<\/script></body></html>`);
  w.document.close();
}
function bindPdfEngine(){
  if($("togglePdfEngineBtn"))$("togglePdfEngineBtn").onclick=()=>apply(()=>state.pdfEngine.open=!state.pdfEngine.open,false);
  if($("renderPdfEnginePreviewBtn"))$("renderPdfEnginePreviewBtn").onclick=()=>renderPdfEngineCanvas();
  if($("exportPdfPreviewPngBtn"))$("exportPdfPreviewPngBtn").onclick=async()=>{await renderPdfEngineCanvas();exportPdfEngineImage("png");};
  if($("exportPdfPreviewJpegBtn"))$("exportPdfPreviewJpegBtn").onclick=async()=>{await renderPdfEngineCanvas();exportPdfEngineImage("jpeg");};
  if($("exportPdfOperationPlanBtn"))$("exportPdfOperationPlanBtn").onclick=()=>exportPdfOperationPlan();
  if($("exportFinalPdfBtn"))$("exportFinalPdfBtn").onclick=()=>exportFinalPdf();
  if($("exportFinalPdfPackBtn"))$("exportFinalPdfPackBtn").onclick=()=>exportFinalPdfPack();
  if($("printPdfVisualBtn"))$("printPdfVisualBtn").onclick=async()=>{await renderPdfEngineCanvas();printPdfVisual();};
  if($("pdfRotation"))$("pdfRotation").onchange=()=>apply(()=>state.pdfEngine.rotation=Number($("pdfRotation").value),false);
  if($("pdfWatermarkText"))$("pdfWatermarkText").oninput=()=>apply(()=>state.pdfEngine.watermark=$("pdfWatermarkText").value,false);
  if($("pdfWatermarkOpacity"))$("pdfWatermarkOpacity").oninput=()=>apply(()=>state.pdfEngine.watermarkOpacity=Number($("pdfWatermarkOpacity").value),false);
  if($("pdfShowPageNumbers"))$("pdfShowPageNumbers").onchange=()=>apply(()=>state.pdfEngine.showPageNumbers=$("pdfShowPageNumbers").checked,false);
  if($("pdfIncludeAnnotations"))$("pdfIncludeAnnotations").onchange=()=>apply(()=>state.pdfEngine.includeAnnotations=$("pdfIncludeAnnotations").checked,false);
  if($("pdfUseDocumentAsBackground"))$("pdfUseDocumentAsBackground").onchange=()=>apply(()=>state.pdfEngine.useDocumentAsBackground=$("pdfUseDocumentAsBackground").checked,false);
  if($("pdfFinalFormat"))$("pdfFinalFormat").onchange=()=>apply(()=>state.pdfEngine.finalFormat=$("pdfFinalFormat").value,false);
  if($("pdfFinalQuality"))$("pdfFinalQuality").oninput=()=>apply(()=>state.pdfEngine.finalQuality=Number($("pdfFinalQuality").value),false);
}
function renderPdfEngine(){
  syncPdfEngineControls();
  renderPdfEngineReport();
}


function canvasToJpegDataUrl(canvas,quality){
  return canvas.toDataURL("image/jpeg",Number(quality||0.92));
}
function dataUrlToBinaryString(dataUrl){
  const base64=dataUrl.split(",")[1]||"";
  return atob(base64);
}
function binaryStringToBytes(bin){
  const arr=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);
  return arr;
}
function pdfEscape(s){
  return String(s||"").replace(/[\\()]/g,"\\$&").replace(/\\r?\\n|\\r/g," ");
}
function makeImagePdfFromJpegDataUrl(dataUrl,options={}){
  const jpegBin=dataUrlToBinaryString(dataUrl);
  const jpegBytes=binaryStringToBytes(jpegBin);
  const format=options.format||state.pdfEngine.finalFormat||"a4-portrait";
  let pageW=595.28, pageH=841.89; // A4 points
  if(format==="a4-landscape"){pageW=841.89;pageH=595.28;}
  if(format==="auto"){
    pageW=options.canvasWidth||595.28;
    pageH=options.canvasHeight||841.89;
  }
  const margin=0;
  const imgW=pageW-margin*2;
  const imgH=pageH-margin*2;
  const title=pdfEscape(options.title||"Signature Studio PDF v25");
  const now=pdfEscape(new Date().toISOString());

  const enc=new TextEncoder();
  const chunks=[];
  let offset=0;
  const offsets=[0];
  function addText(str){
    const b=enc.encode(str);
    chunks.push(b);
    offset+=b.length;
  }
  function addBytes(bytes){
    chunks.push(bytes);
    offset+=bytes.length;
  }
  function obj(id,body){
    offsets[id]=offset;
    addText(`${id} 0 obj
${body}
endobj
`);
  }

  addText("%PDF-1.4\n%âãÏÓ");
  obj(1,`<< /Type /Catalog /Pages 2 0 R >>`);
  obj(2,`<< /Type /Pages /Kids [3 0 R] /Count 1 >>`);
  obj(3,`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW.toFixed(2)} ${pageH.toFixed(2)}] /Resources << /XObject << /Im0 4 0 R >> /ProcSet [/PDF /ImageC] >> /Contents 5 0 R >>`);
  offsets[4]=offset;
  addText(`4 0 obj
<< /Type /XObject /Subtype /Image /Width ${options.pixelWidth||1} /Height ${options.pixelHeight||1} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>
stream
`);
  addBytes(jpegBytes);
  addText("\nendstream\nendobj");
  const content=`q
${imgW.toFixed(2)} 0 0 ${imgH.toFixed(2)} ${margin.toFixed(2)} ${margin.toFixed(2)} cm
/Im0 Do
Q
`;
  obj(5,`<< /Length ${enc.encode(content).length} >>
stream
${content}endstream`);
  obj(6,`<< /Title (${title}) /Creator (Signature Studio v25) /Producer (Signature Studio PWA) /CreationDate (${now}) >>`);

  const xref=offset;
  addText(`xref
0 7
0000000000 65535 f 
`);
  for(let i=1;i<=6;i++){
    addText(String(offsets[i]).padStart(10,"0")+" 00000 n \n");
  }
  addText(`trailer
<< /Size 7 /Root 1 0 R /Info 6 0 R >>
startxref
${xref}
%%EOF`);
  return new Blob(chunks,{type:"application/pdf"});
}
async function exportFinalPdf(){
  await renderPdfEngineCanvas();
  const canvas=$("pdfEngineCanvas");
  if(!canvas)return;
  const quality=Number(state.pdfEngine.finalQuality||0.92);
  const dataUrl=canvasToJpegDataUrl(canvas,quality);
  const doc=selectedDocument();
  const blob=makeImagePdfFromJpegDataUrl(dataUrl,{
    format:state.pdfEngine.finalFormat,
    canvasWidth:canvas.width,
    canvasHeight:canvas.height,
    pixelWidth:canvas.width,
    pixelHeight:canvas.height,
    title:doc?doc.name:"document-final-v25"
  });
  state.pdfEngine.lastPdfExportAt=new Date().toISOString();
  autoSave();
  const name=doc?safeFileName(doc.name.replace(/\.[^.]+$/,"")):"document";
  download(`${name}-final-v25.pdf`,blob,"application/pdf");
  renderPdfEngineReport();
  toast("PDF final généré.");
}
function buildPdfOperationReport(){
  const doc=selectedDocument();
  return {
    version:"25.0",
    type:"pdf-final-export-report",
    generatedAt:new Date().toISOString(),
    document:doc?{name:doc.name,type:doc.type,size:doc.size,kind:docKind(doc)}:null,
    output:{
      format:state.pdfEngine.finalFormat,
      quality:state.pdfEngine.finalQuality,
      imageBased:true,
      selectableText:false,
      legalSignature:false
    },
    operations:{
      rotation:state.pdfEngine.rotation,
      watermark:state.pdfEngine.watermark,
      watermarkOpacity:state.pdfEngine.watermarkOpacity,
      pageNumbers:state.pdfEngine.showPageNumbers,
      annotationsIncluded:state.pdfEngine.includeAnnotations,
      annotationsCount:state.signer.annotations.length
    },
    annotations:state.signer.annotations,
    note:"PDF final image-based généré depuis canvas. Signature visuelle uniquement."
  };
}
async function exportFinalPdfPack(){
  await renderPdfEngineCanvas();
  const canvas=$("pdfEngineCanvas");
  if(!canvas)return;
  const doc=selectedDocument();
  const name=doc?safeFileName(doc.name.replace(/\.[^.]+$/,"")):"document";
  const dataUrl=canvasToJpegDataUrl(canvas,Number(state.pdfEngine.finalQuality||0.92));
  const pdfBlob=makeImagePdfFromJpegDataUrl(dataUrl,{
    format:state.pdfEngine.finalFormat,
    canvasWidth:canvas.width,
    canvasHeight:canvas.height,
    pixelWidth:canvas.width,
    pixelHeight:canvas.height,
    title:doc?doc.name:"document-final-v25"
  });
  const pdfBytes=new Uint8Array(await pdfBlob.arrayBuffer());
  const report=JSON.stringify(buildPdfOperationReport(),null,2);
  const plan=JSON.stringify({
    version:"25.0",
    type:"pdf-final-pack-plan",
    pdfEngine:state.pdfEngine,
    annotations:state.signer.annotations,
    exportedAt:new Date().toISOString()
  },null,2);
  const readme=`Pack PDF final Signature Studio v25

Contenu :
- pdf/${name}-final-v25.pdf
- rapport-operation-pdf-v25.json
- plan-operations-pdf-v25.json

Note : PDF image-based avec annotations visuelles intégrées.
`;
  const zip=makeZipBinary([
    [`pdf/${name}-final-v25.pdf`,pdfBytes],
    ["rapport-operation-pdf-v25.json",new TextEncoder().encode(report)],
    ["plan-operations-pdf-v25.json",new TextEncoder().encode(plan)],
    ["README.txt",new TextEncoder().encode(readme)]
  ]);
  state.pdfEngine.lastPdfExportAt=new Date().toISOString();
  autoSave();
  download("pack-pdf-final-v25.zip",zip,"application/zip");
  renderPdfEngineReport();
  toast("Pack PDF final généré.");
}
function exportPdfOperationReport(){
  const report=buildPdfOperationReport();
  download("rapport-operation-pdf-v25.json",JSON.stringify(report,null,2),"application/json");
}


function studioPage(){
  return state.studio.pages[state.studio.selectedPage] || state.studio.pages[0];
}
function studioObjects(){
  return studioPage().objects || [];
}
function studioObject(id=state.studio.selectedObjectId){
  return studioObjects().find(o=>o.id===id) || null;
}
function studioSnap(v){
  return state.studio.snap ? Math.round(v/12)*12 : Math.round(v);
}
function renderStudio(){
  if(!$("studioCanvas")) return;
  renderStudioFormats();
  renderStudioAi();
  renderStudioElements();
  renderStudioImages();
  renderStudioLibraryV27();
  renderStudioEffects();
  renderStudioPages();
  renderStudioCanvas();
  renderStudioProps();
  renderStudioLayers();
  renderStudioHistory();
}
function renderStudioFormats(){
  if(!$("studioFormatsGrid")) return;
  const q=($("studioFormatSearch")?.value||"").toLowerCase();
  const list=studioFormats.filter(f=>!q || (f.name+" "+f.category).toLowerCase().includes(q));
  $("studioFormatsGrid").innerHTML=list.map(f=>`<div class="studio-mini-card ${state.studio.format===f.id?"active":""}" data-studio-format="${f.id}">
    <strong>${esc(f.name)}</strong><span>${f.w}×${f.h} · ${esc(f.category)}</span>
  </div>`).join("");
  document.querySelectorAll("[data-studio-format]").forEach(b=>b.onclick=()=>apply(()=>setStudioFormat(b.dataset.studioFormat)));
}
function setStudioFormat(id){
  const f=studioFormats.find(x=>x.id===id);
  if(!f)return;
  const p=studioPage();
  state.studio.format=f.id;
  p.w=f.w;p.h=f.h;
  fitStudioZoom();
}
function fitStudioZoom(){
  const p=studioPage();
  const zw=Math.min(1.2,Math.max(.25,760/p.w));
  const zh=Math.min(1.2,Math.max(.25,460/p.h));
  state.studio.zoom=Math.min(zw,zh);
}
async function renderQrCodeObject(o) {
  const container = document.getElementById("qr_" + o.id);
  if (!container) return;
  try {
    const url = await QRCode.toDataURL(o.text || window.location.href, {
      margin: 2,
      color: {
        dark: o.fill || "#273540",
        light: "#ffffff00" // Transparent background
      },
      width: o.w * 2 // High res
    });
    container.innerHTML = `<img src="${url}" style="width:100%; height:100%; object-fit:contain;">`;
  } catch (err) {
    console.error(err);
    container.innerHTML = "QR Error";
  }
}
function renderStudioElements(){
  if(!$("studioElementsGrid")) return;
  const q=($("studioElementSearch")?.value||"").toLowerCase();
  
  // Ensure QR tool is in the list
  if(!studioElements.some(e=>e.id==="qr-code")){
    studioElements.unshift({id:"qr-code",name:"Code QR",type:"shape",shape:"qr"});
  }
  
  const list=studioElements.filter(e=>!q || (e.name+" "+e.type+" "+e.shape).toLowerCase().includes(q));
  $("studioElementsGrid").innerHTML=list.map(e=>`<div class="studio-mini-card" data-add-studio-element="${e.id}">
    <strong>${esc(e.name)}</strong><span>${esc(e.type)} · ${esc(e.shape)}</span>
  </div>`).join("");
  document.querySelectorAll("[data-add-studio-element]").forEach(b=>b.onclick=()=>addStudioElement(b.dataset.addStudioElement));
}
function renderStudioImages(){
  if(!$("studioImageAssets")) return;
  const imgs=state.assets.filter(a=>(a.role||"").includes("image")||(a.role||"").includes("logo")||(a.role||"").includes("signature")||a.src?.startsWith("data:image")).slice(0,8);
  $("studioImageAssets").innerHTML=imgs.length?imgs.map((a,i)=>`<div class="studio-mini-card" data-studio-asset="${i}">
    <strong>${esc(a.name||"image")}</strong><span>${esc(a.role||"asset")}</span>
  </div>`).join(""):`<div class="studio-mini-card"><strong>Aucune image</strong><span>Importe une image</span></div>`;
  document.querySelectorAll("[data-studio-asset]").forEach(b=>b.onclick=()=>addStudioImage(imgs[+b.dataset.studioAsset].src,imgs[+b.dataset.studioAsset].name));
}
function renderStudioPages(){
  if(!$("studioPagesList")) return;
  $("studioPagesList").innerHTML=state.studio.pages.map((p,i)=>`<div class="studio-page-card ${state.studio.selectedPage===i?"active":""}" data-studio-page="${i}">
    <strong>${esc(p.name)}</strong><span>${p.w}×${p.h} · ${p.objects.length} objet(s)</span>
  </div>`).join("");
  document.querySelectorAll("[data-studio-page]").forEach(b=>b.onclick=()=>apply(()=>{state.studio.selectedPage=+b.dataset.studioPage;state.studio.selectedObjectId="";},false));
}
function renderStudioCanvas(){
  const p=studioPage();
  const canvas=$("studioCanvas");
  canvas.style.width=p.w+"px";
  canvas.style.height=p.h+"px";
  canvas.style.backgroundColor=p.bg||"#fff";
  canvas.style.transform=`scale(${state.studio.zoom})`;
  canvas.style.transformOrigin="top left";
  if($("studioCanvasSizer")){
    $("studioCanvasSizer").style.width=(p.w*state.studio.zoom)+"px";
    $("studioCanvasSizer").style.height=(p.h*state.studio.zoom)+"px";
  }
  canvas.classList.toggle("grid-on",!!state.studio.showGrid);
  canvas.innerHTML=p.objects.slice().sort((a,b)=>(a.z||0)-(b.z||0)).map(o=>studioObjectHtml(o)).join("");
  
  // Render QR codes after HTML is set
  p.objects.forEach(o => {
    if (o.shape === "qr") renderQrCodeObject(o);
  });

  bindStudioObjects();
  bindStudioDropLibrary();
  bindStudioEffects();
  bindStudioAi();
  bindCollaboration();
  bindConnectors();
  bindEcosystem();
  bindBackend();
  bindBusinessConnectors();
  if($("studioZoom")) $("studioZoom").value=Math.round(state.studio.zoom*100);
  if($("studioZoomLabel")) $("studioZoomLabel").textContent=Math.round(state.studio.zoom*100)+"%";
  if($("studioGridToggle")) $("studioGridToggle").checked=!!state.studio.showGrid;
  if($("studioSnapToggle")) $("studioSnapToggle").checked=!!state.studio.snap;
}
function studioObjectHtml(o){
  const selected=state.studio.selectedObjectId===o.id?"selected":"";
  const grouped=o.groupId?"grouped":"";
  const e=normalizeStudioEffects(o.effects);
  const flip=`scale(${e.flipX?-1:1},${e.flipY?-1:1})`;
  const common=`left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px;opacity:${o.opacity};transform:rotate(${o.rotate||0}deg) ${flip};z-index:${o.z||1};color:${o.fill||"#273540"};background:${objectBackground(o)};border:${studioBorderCss(o)};border-radius:${studioRadiusCss(o)};font-size:${o.fontSize||28}px;filter:${studioFilterCss(o)};box-shadow:${studioShadowCss(o)};text-align:${o.textAlign||"left"};`;
  let inner="";
  let cls=o.type;
  if(o.type==="text") inner=esc(o.text||"Texte");
  else if(o.type==="image") inner=`<img src="${o.src}" alt="" style="object-fit:${normalizeStudioEffects(o.effects).fit||"contain"}">`;
  else if(o.shape==="logo") inner="LOGO";
  else if(o.shape==="qr") inner=`<div class="qr-placeholder" id="qr_${o.id}"></div>`;
  else if(o.shape==="arrow") inner="➜";
  else if(o.shape==="stamp") inner=esc(o.text||"VALIDÉ");
  else inner=esc(o.text||"");
  return `<div class="studio-object ${cls} ${o.shape||""} ${hasStudioEffects(o)?"has-effects":""} ${grouped} ${selected}" data-studio-object="${o.id}" style="${common}">${inner}${o.groupId?'<span class="studio-group-badge">G</span>':""}<span class="studio-resize" data-studio-resize="${o.id}"></span></div>`;
}
function objectBackground(o){
  if(o.type==="text"||o.shape==="line"||o.shape==="stamp"||o.shape==="qr") return "transparent";
  if(o.type==="placeholder") return "rgba(255,201,40,.18)";
  return o.fill || "#ecc764";
}
function objectBorder(o){
  if(o.type==="placeholder") return "2px dashed rgba(8,45,74,.35)";
  if(o.shape==="line") return "0";
  if(o.shape==="stamp") return "3px solid currentColor";
  return o.border || "0";
}
function addStudioElement(id){
  let e=studioElements.find(x=>x.id===id);
  if(!e && id==="qr-code") e={id:"qr-code",name:"Code QR",type:"shape",shape:"qr"};
  if(!e)return;
  const p=studioPage();
  const obj={
    id:"obj_"+Date.now()+"_"+Math.floor(Math.random()*999),
    type:e.type==="placeholder"?"placeholder":(e.type==="stamp"?"stamp":"shape"),
    shape:e.shape,
    text:e.shape==="stamp"?"VALIDÉ":(e.shape==="badge"?"Badge":(e.shape==="qr"?window.location.href:"")),
    x:studioSnap(Math.round((p.w-(e.shape==="line"?220:(e.shape==="qr"?150:(e.shape==="circle"?120:180))))/2)),
    y:studioSnap(Math.round((p.h-(e.shape==="line"?4:(e.shape==="qr"?150:(e.shape==="circle"?120:90))))/2)),
    w:e.shape==="line"?220:(e.shape==="qr"?150:(e.shape==="circle"?120:180)),
    h:e.shape==="line"?4:(e.shape==="qr"?150:(e.shape==="circle"?120:90)),
    fill:e.shape==="stamp"?"#273540":"#ecc764",
    opacity:1,
    rotate:e.shape==="stamp"?-6:0,
    z:maxStudioZ()+10
  };
  apply(()=>{p.objects.push(obj);state.studio.selectedObjectId=obj.id;},false);
}
function addStudioText(kind="title"){
  const p=studioPage();
  const value=($("studioTextInput")?.value||"Votre texte ici").trim()||"Votre texte ici";
  const sizes={title:54,subtitle:34,paragraph:22};
  const obj={
    id:"obj_"+Date.now()+"_"+Math.floor(Math.random()*999),
    type:"text",
    shape:"text",
    text:kind==="title"?"Titre principal":kind==="subtitle"?"Sous-titre":value,
    x:Math.round((p.w-520)/2),y:Math.round((p.h-90)/2),w:520,h:90,
    fill:"#273540",
    opacity:1,
    rotate:0,
    fontSize:sizes[kind]||28,
    z:maxStudioZ()+10
  };
  if(kind==="paragraph"){obj.text=value;obj.h=150;obj.fontSize=22;}
  apply(()=>{p.objects.push(obj);state.studio.selectedObjectId=obj.id;},false);
}
function addStudioImage(src,name="image"){
  if(!src)return toast("Aucune image disponible.");
  const p=studioPage();
  const obj={id:"obj_"+Date.now()+"_"+Math.floor(Math.random()*999),type:"image",shape:"image",src,name,x:Math.round((p.w-260)/2),y:Math.round((p.h-160)/2),w:260,h:160,fill:"#ffffff",opacity:1,rotate:0,z:maxStudioZ()+10};
  apply(()=>{p.objects.push(obj);state.studio.selectedObjectId=obj.id;},false);
}
function maxStudioZ(){
  return Math.max(0,...studioObjects().map(o=>o.z||0));
}
function minStudioZ(){
  return Math.min(0,...studioObjects().map(o=>o.z||0));
}
function renderStudioHistory(){
  const container = document.getElementById("studioHistoryList");
  if (!container) return;
  const list = historyLog.slice().reverse().slice(0, 10);
  container.innerHTML = list.map((h, i) => {
    const d = new Date(h.time);
    const timeStr = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
    return `<div class="studio-history-item" data-history-index="${historyLog.length - 1 - i}">
      <span>${esc(h.label)}</span>
      <span class="time">${timeStr}</span>
    </div>`;
  }).join("");
  if (list.length === 0) container.innerHTML = '<div class="text-[10px] text-slate-400 italic">Aucune action</div>';
  
  container.querySelectorAll("[data-history-index]").forEach(el => {
    el.onclick = () => {
      const idx = +el.dataset.historyIndex;
      const h = historyLog[idx];
      if (h) {
        state = clone(h.state);
        // Trim history and log up to this point
        history = history.slice(0, idx);
        historyLog = historyLog.slice(0, idx + 1);
        renderAll();
        toast("Retour arrière effectué");
      }
    };
  });
}

function renderStudioGuides(x, y) {
  const guides = document.getElementById("studioGuides");
  if (!guides) return;
  guides.innerHTML = '';
  const scale = state.studio.zoom || 1;
  if (x !== null) {
    const line = document.createElement('div');
    line.className = 'guide vertical';
    line.style.left = (x * scale) + "px";
    guides.appendChild(line);
  }
  if (y !== null) {
    const line = document.createElement('div');
    line.className = 'guide horizontal';
    line.style.top = (y * scale) + "px";
    guides.appendChild(line);
  }
}

function bindStudioObjects(){
  let drag=null, resize=null;
  document.querySelectorAll("[data-studio-object]").forEach(el=>{
    el.onmousedown=e=>{
      if(e.target.classList.contains("studio-resize"))return;
      e.preventDefault();
      const id=el.dataset.studioObject;
      const o=studioObject(id); if(!o)return;
      state.studio.selectedObjectId=id;
      drag={id,startX:e.clientX,startY:e.clientY,ox:o.x,oy:o.y};
      renderStudioProps();renderStudioLayers();
    };
  });
  document.querySelectorAll("[data-studio-resize]").forEach(el=>{
    el.onmousedown=e=>{
      e.stopPropagation();e.preventDefault();
      const id=el.dataset.studioResize;
      const o=studioObject(id); if(!o)return;
      state.studio.selectedObjectId=id;
      resize={id,startX:e.clientX,startY:e.clientY,ow:o.w,oh:o.h};
    };
  });
  const move=e=>{
    const scale=state.studio.zoom||1;
    if(drag){
      const o=studioObject(drag.id); if(!o)return;
      let newX = drag.ox + (e.clientX - drag.startX) / scale;
      let newY = drag.oy + (e.clientY - drag.startY) / scale;

      const p = studioPage();
      const threshold = 8 / scale;
      let snapX = null, snapY = null;

      const targets = [
        { x: 0, type: 'v' }, { x: p.w, type: 'v' }, { x: p.w / 2, type: 'v' },
        { y: 0, type: 'h' }, { y: p.h, type: 'h' }, { y: p.h / 2, type: 'h' }
      ];

      p.objects.forEach(other => {
        if (other.id === o.id) return;
        targets.push({ x: other.x, type: 'v' });
        targets.push({ x: other.x + other.w, type: 'v' });
        targets.push({ x: other.x + other.w / 2, type: 'v' });
        targets.push({ y: other.y, type: 'h' });
        targets.push({ y: other.y + other.h, type: 'h' });
        targets.push({ y: other.y + other.h / 2, type: 'h' });
      });

      targets.forEach(t => {
        if (t.type === 'v') {
          if (Math.abs(newX - t.x) < threshold) { newX = t.x; snapX = t.x; }
          else if (Math.abs((newX + o.w) - t.x) < threshold) { newX = t.x - o.w; snapX = t.x; }
          else if (Math.abs((newX + o.w / 2) - t.x) < threshold) { newX = t.x - o.w / 2; snapX = t.x; }
        } else {
          if (Math.abs(newY - t.y) < threshold) { newY = t.y; snapY = t.y; }
          else if (Math.abs((newY + o.h) - t.y) < threshold) { newY = t.y - o.h; snapY = t.y; }
          else if (Math.abs((newY + o.h / 2) - t.y) < threshold) { newY = t.y - o.h / 2; snapY = t.y; }
        }
      });

      o.x = studioSnap(newX);
      o.y = studioSnap(newY);
      renderStudioGuides(snapX, snapY);

      const node=document.querySelector(`[data-studio-object="${drag.id}"]`);
      if(node){node.style.left=o.x+"px";node.style.top=o.y+"px";}
      renderStudioProps();
    }
    if(resize){
      const o=studioObject(resize.id); if(!o)return;
      o.w=Math.max(12,studioSnap(resize.ow+(e.clientX-resize.startX)/scale));
      o.h=Math.max(4,studioSnap(resize.oh+(e.clientY-resize.startY)/scale));
      const node=document.querySelector(`[data-studio-object="${resize.id}"]`);
      if(node){node.style.width=o.w+"px";node.style.height=o.h+"px";}
      renderStudioProps();
    }
  };
  const up=()=>{
    if(drag||resize){
      const label = drag ? "Déplacement" : "Redimensionnement";
      drag=null;resize=null;
      renderStudioGuides(null, null);
      apply(()=>{}, true, label);
      renderStudio();
    }
    document.removeEventListener("mousemove",move);document.removeEventListener("mouseup",up);
  };
  document.querySelectorAll("[data-studio-object],[data-studio-resize]").forEach(el=>{
    el.addEventListener("mousedown",()=>{document.addEventListener("mousemove",move);document.addEventListener("mouseup",up);},{once:true});
  });
}
function renderStudioProps(){
  const o=studioObject();
  if($("studioSelectedInfo")) $("studioSelectedInfo").textContent=o?`${o.type} · ${o.w}×${o.h}`:"Aucun objet";
  renderStudioEffects();
  const disabled=!o;
  [["studioObjX","x"],["studioObjY","y"],["studioObjW","w"],["studioObjH","h"],["studioObjRotate","rotate"],["studioObjOpacity","opacity"],["studioObjFill","fill"],["studioObjText","text"],["studioObjFontSize","fontSize"],["studioObjTextAlign","textAlign"]].forEach(([id,k])=>{
    if(!$(id))return;
    $(id).disabled=disabled;
    if(o) $(id).value=o[k] ?? (k==="opacity"?1:"");
  });
}
function renderStudioLayers(){
  if(!$("studioLayersList")) return;
  const list=studioObjects().slice().sort((a,b)=>(b.z||0)-(a.z||0));
  $("studioLayersList").innerHTML=list.map(o=>`<div class="studio-layer ${state.studio.selectedObjectId===o.id?"active":""}">
    <span>${esc(o.type)} ${esc(o.text||o.name||o.shape||"")}${o.groupId?' <em>Groupe</em>':""}</span>
    <button data-studio-layer="${o.id}">OK</button>
  </div>`).join("");
  document.querySelectorAll("[data-studio-layer]").forEach(b=>b.onclick=()=>apply(()=>state.studio.selectedObjectId=b.dataset.studioLayer,false));
}
function updateStudioObject(prop,value){
  const o=studioObject(); if(!o)return;
  apply(()=>{o[prop]=value;}, true, `Modif. ${prop}`);
}
function duplicateStudioObject(){
  const o=studioObject(); if(!o)return;
  const copy=clone(o); copy.id="obj_"+Date.now()+"_"+Math.floor(Math.random()*999); copy.x+=24; copy.y+=24; copy.z=maxStudioZ()+10;
  delete copy.groupId;
  apply(()=>{studioObjects().push(copy);state.studio.selectedObjectId=copy.id;}, true, "Duplication objet");
}
function deleteStudioObject(){
  const id=state.studio.selectedObjectId; if(!id)return;
  apply(()=>{studioPage().objects=studioObjects().filter(o=>o.id!==id);state.studio.selectedObjectId="";}, true, "Suppression objet");
}
function bringStudioFront(){const o=studioObject(); if(o)apply(()=>o.z=maxStudioZ()+10, true, "Objet devant");}
function sendStudioBack(){const o=studioObject(); if(o)apply(()=>o.z=minStudioZ()-10, true, "Objet derrière");}
function studioDistance(a,b){
  const ax=(a.x||0)+(a.w||0)/2, ay=(a.y||0)+(a.h||0)/2;
  const bx=(b.x||0)+(b.w||0)/2, by=(b.y||0)+(b.h||0)/2;
  return Math.hypot(ax-bx,ay-by);
}
function groupStudioSelection(){
  const o=studioObject();
  if(!o)return toast("Selectionne un objet Studio.");
  if(o.groupId){
    const gid=o.groupId;
    const count=studioObjects().filter(x=>x.groupId===gid).length;
    apply(()=>studioObjects().forEach(x=>{if(x.groupId===gid)delete x.groupId;}), true, "Degroupement Studio");
    toast(`${count} objet(s) degroupes.`);
    return;
  }
  const others=studioObjects().filter(x=>x.id!==o.id);
  if(!others.length)return toast("Ajoute au moins un second objet a grouper.");
  const nearest=others.slice().sort((a,b)=>studioDistance(o,a)-studioDistance(o,b))[0];
  const gid="grp_"+Date.now();
  apply(()=>{
    o.groupId=gid;
    nearest.groupId=gid;
  }, true, "Groupement Studio");
  toast("2 objets groupes. Reclique sur Groupe pour degrouper.");
}
function addStudioPage(){
  const base=studioPage();
  apply(()=>{state.studio.pages.push({id:"page_"+Date.now(),name:`Page ${state.studio.pages.length+1}`,w:base.w,h:base.h,bg:"#ffffff",objects:[]});state.studio.selectedPage=state.studio.pages.length-1;state.studio.selectedObjectId="";}, true, "Ajout page");
}
function duplicateStudioPage(){
  const p=studioPage();
  const cp=clone(p); cp.id="page_"+Date.now(); cp.name=p.name+" copie"; cp.objects=cp.objects.map(o=>({...o,id:"obj_"+Date.now()+"_"+Math.floor(Math.random()*999)}));
  apply(()=>{state.studio.pages.push(cp);state.studio.selectedPage=state.studio.pages.length-1;state.studio.selectedObjectId="";}, true, "Duplication page");
}
function deleteStudioPage(){
  if(state.studio.pages.length<=1)return toast("Impossible de supprimer la dernière page.");
  apply(()=>{state.studio.pages.splice(state.studio.selectedPage,1);state.studio.selectedPage=Math.max(0,state.studio.selectedPage-1);state.studio.selectedObjectId="";}, true, "Suppression page");
}
async function drawStudioToCanvas(page=studioPage()){
  const canvas=document.createElement("canvas");
  canvas.width=page.w; canvas.height=page.h;
  const ctx=canvas.getContext("2d");
  ctx.fillStyle=page.bg||"#fff"; ctx.fillRect(0,0,page.w,page.h);
  const objects=page.objects.slice().sort((a,b)=>(a.z||0)-(b.z||0));
  for(const o of objects){
    ctx.save();
    ctx.globalAlpha=o.opacity ?? 1;
    ctx.translate(o.x+o.w/2,o.y+o.h/2);
    ctx.rotate((o.rotate||0)*Math.PI/180);
    ctx.translate(-o.w/2,-o.h/2);
    await drawStudioObject(ctx,o);
    ctx.restore();
  }
  return canvas;
}
async function drawStudioObject(ctx,o){
  applyCanvasEffects(ctx,o);
  const e=normalizeStudioEffects(o.effects);
  ctx.fillStyle=o.fill||"#ecc764";
  ctx.strokeStyle=o.fill||"#273540";
  ctx.lineWidth=3;
  if(o.type==="text"){
    ctx.fillStyle=o.fill||"#273540";
    ctx.font=`bold ${o.fontSize||28}px Arial`;
    wrapText(ctx,o.text||"Texte",6,(o.fontSize||28),o.w-12,(o.fontSize||28)*1.15);
  }else if(o.type==="image"&&o.src){
    const img=await loadImageAsync(o.src);
    if(img)fitDrawImageMode(ctx,img,0,0,o.w,o.h,e.fit||"contain");
  }else if(o.shape==="circle"){
    ctx.beginPath();ctx.arc(o.w/2,o.h/2,Math.min(o.w,o.h)/2,0,Math.PI*2);ctx.fill();
  }else if(o.shape==="line"){
    ctx.fillRect(0,o.h/2, o.w, Math.max(3,o.h));
  }else if(o.shape==="stamp"){
    ctx.strokeRect(4,4,o.w-8,o.h-8); ctx.font="bold 24px Arial"; ctx.textAlign="center"; ctx.fillText(o.text||"VALIDÉ",o.w/2,o.h/2+8); ctx.textAlign="left";
  }else if(o.shape==="qr"){
    try {
      const qrCanvas = document.createElement("canvas");
      await QRCode.toCanvas(qrCanvas, o.text || window.location.href, { 
        margin: 2, 
        width: o.w,
        color: { dark: o.fill || "#273540", light: "#ffffff00" }
      });
      ctx.drawImage(qrCanvas, 0, 0, o.w, o.h);
    } catch(e) {
      console.error(e);
      ctx.fillRect(0,0,o.w,o.h);
    }
  }else{
    roundedRect(ctx,0,0,o.w,o.h,canvasObjectRadius(o)||(o.shape==="round"||o.shape==="badge"?18:0));ctx.fill();
    if(o.text){ctx.fillStyle="#273540";ctx.font="bold 24px Arial";ctx.textAlign="center";ctx.fillText(o.text,o.w/2,o.h/2+8);ctx.textAlign="left";}
  }
  clearCanvasEffects(ctx);
  canvasDrawBorder(ctx,o);
}
function roundedRect(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
}
async function exportStudioImage(kind="png"){
  const canvas=await drawStudioToCanvas();
  const type=kind==="jpeg"?"image/jpeg":"image/png";
  canvas.toBlob(blob=>download(kind==="jpeg"?"studio-export-v26.jpg":"studio-export-v26.png",blob,type),type,.92);
}
async function exportStudioPdf(){
  const canvas=await drawStudioToCanvas();
  const dataUrl=canvas.toDataURL("image/jpeg",.92);
  const blob=makeImagePdfFromJpegDataUrl(dataUrl,{format:"auto",canvasWidth:canvas.width,canvasHeight:canvas.height,pixelWidth:canvas.width,pixelHeight:canvas.height,title:"Studio export v26"});
  download("studio-export-v26.pdf",blob,"application/pdf");
}
function exportStudioJson(){
  download("studio-projet-v26.json",JSON.stringify({version:"26.0",studio:state.studio},null,2),"application/json");
}
function activateStudioPanel(panelId){
  const tab=document.querySelector(`.studio-tab[data-studio-panel="${panelId}"]`);
  const panel=$(panelId);
  if(!tab||!panel)return;
  document.querySelectorAll(".studio-tab").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".studio-panel").forEach(x=>x.classList.remove("active"));
  tab.classList.add("active");
  panel.classList.add("active");
}
function bindStudio(){
  document.querySelectorAll(".studio-tab").forEach(b=>b.onclick=()=>activateStudioPanel(b.dataset.studioPanel));
  if($("studioFormatSearch")) $("studioFormatSearch").oninput=renderStudioFormats;
  bindStudioDropLibrary();
  if($("studioElementSearch")) $("studioElementSearch").oninput=renderStudioElements;
  if($("studioAddTitleBtn")) $("studioAddTitleBtn").onclick=()=>addStudioText("title");
  if($("studioAddSubtitleBtn")) $("studioAddSubtitleBtn").onclick=()=>addStudioText("subtitle");
  if($("studioAddParagraphBtn")) $("studioAddParagraphBtn").onclick=()=>addStudioText("paragraph");
  if($("studioImportImageBtn")) $("studioImportImageBtn").onclick=()=>{$("studioImageInput").value="";$("studioImageInput").click();};
  if($("studioImageInput")) $("studioImageInput").onchange=e=>{readImage(e.target.files[0],(src,f)=>apply(()=>{state.assets.unshift({name:f.name,role:"studio-image",src,tags:["studio","image"]});addStudioImage(src,f.name);},false));e.target.value="";};
  if($("studioUseLogoBtn")) $("studioUseLogoBtn").onclick=()=>addStudioImage(state.logo.src,state.logo.name||"Logo");
  if($("studioUseSignatureBtn")) $("studioUseSignatureBtn").onclick=()=>addStudioImage(state.signer.signatureImage,"Signature");
  if($("studioAddPageBtn")) $("studioAddPageBtn").onclick=()=>addStudioPage();
  if($("studioDuplicatePageBtn")) $("studioDuplicatePageBtn").onclick=()=>duplicateStudioPage();
  if($("studioDeletePageBtn")) $("studioDeletePageBtn").onclick=()=>deleteStudioPage();
  if($("studioUndoBtn")) $("studioUndoBtn").onclick=()=>undo();
  if($("studioDuplicateObjectBtn")) $("studioDuplicateObjectBtn").onclick=()=>duplicateStudioObject();
  if($("studioDeleteObjectBtn")) $("studioDeleteObjectBtn").onclick=()=>deleteStudioObject();
  if($("studioCenterObjBtn")) $("studioCenterObjBtn").onclick=()=>apply(()=>{const p=studioPage(); const o=studioObject(); if(!o)return; o.x=Math.round((p.w-o.w)/2); o.y=Math.round((p.h-o.h)/2);},true,"Objet centré");
  if($("studioBringFrontBtn")) $("studioBringFrontBtn").onclick=()=>bringStudioFront();
  if($("studioSendBackBtn")) $("studioSendBackBtn").onclick=()=>sendStudioBack();
  if($("studioGroupBtn")) $("studioGroupBtn").onclick=groupStudioSelection;
  if($("studioExportPngBtn")) $("studioExportPngBtn").onclick=()=>exportStudioImage("png");
  if($("studioExportJpegBtn")) $("studioExportJpegBtn").onclick=()=>exportStudioImage("jpeg");
  if($("studioExportPdfBtn")) $("studioExportPdfBtn").onclick=()=>exportStudioPdf();
  if($("studioExportJsonBtn")) $("studioExportJsonBtn").onclick=()=>exportStudioJson();
  if($("studioAddToLibraryBtn")) $("studioAddToLibraryBtn").onclick=()=>addSelectedObjectToLibrary();
  if($("studioLibrarySearch")) $("studioLibrarySearch").oninput=()=>{state.studio.library.search=$("studioLibrarySearch").value;renderStudioLibrary();};
  if($("studioLibraryCategory")) $("studioLibraryCategory").onchange=()=>{state.studio.library.selectedCategory=$("studioLibraryCategory").value;renderStudioLibrary();};
  if($("studioLibraryPack")) $("studioLibraryPack").onchange=()=>{state.studio.library.selectedPack=$("studioLibraryPack").value;renderStudioLibrary();};
  if($("studioImportLibraryAssetBtn")) $("studioImportLibraryAssetBtn").onclick=()=>{$("studioLibraryAssetInput").value="";$("studioLibraryAssetInput").click();};
  if($("studioLibraryAssetInput")) $("studioLibraryAssetInput").onchange=e=>{importStudioLibraryAssets(e.target.files);e.target.value="";};
  if($("studioExportLibraryBtn")) $("studioExportLibraryBtn").onclick=()=>exportStudioLibrary();
  if($("studioImportLibraryBtn")) $("studioImportLibraryBtn").onclick=()=>{$("studioLibraryJsonInput").value="";$("studioLibraryJsonInput").click();};
  if($("studioLibraryJsonInput")) $("studioLibraryJsonInput").onchange=e=>{importStudioLibraryJson(e.target.files[0]);e.target.value="";};
  if($("studioTemplateSearch")) $("studioTemplateSearch").oninput=renderStudioTemplates;
  if($("studioTemplateCategory")) $("studioTemplateCategory").onchange=renderStudioTemplates;
  if($("studioTemplateFavorite")) $("studioTemplateFavorite").onchange=renderStudioTemplates;
  if($("studioSaveAsTemplateBtn")) $("studioSaveAsTemplateBtn").onclick=()=>saveStudioPageAsTemplate();
  if($("studioExportTemplatesBtn")) $("studioExportTemplatesBtn").onclick=()=>download("templates-studio-v27.json",JSON.stringify({version:"27.0",templates:state.studio.library.templates},null,2),"application/json");
  if($("studioZoom")) $("studioZoom").oninput=()=>apply(()=>state.studio.zoom=Number($("studioZoom").value)/100,false);
  if($("studioGridToggle")) $("studioGridToggle").onchange=()=>apply(()=>state.studio.showGrid=$("studioGridToggle").checked,false);
  if($("studioSnapToggle")) $("studioSnapToggle").onchange=()=>apply(()=>state.studio.snap=$("studioSnapToggle").checked,false);
  [["studioObjX","x","number"],["studioObjY","y","number"],["studioObjW","w","number"],["studioObjH","h","number"],["studioObjRotate","rotate","number"],["studioObjOpacity","opacity","number"],["studioObjFill","fill","text"],["studioObjText","text","text"],["studioObjFontSize","fontSize","number"],["studioObjTextAlign","textAlign","text"]].forEach(([id,prop,type])=>{if($(id))$(id).oninput=()=>updateStudioObject(prop,type==="number"?Number($(id).value):$(id).value);});
}


function allStudioLibraryAssets(){
  const seed=(studioLibrarySeed.assets||[]).map(a=>({...a,seed:true}));
  const user=(state.studio.library.assets||[]).map(a=>({...a,seed:false}));
  const existingAssets=(state.assets||[]).filter(a=>a.src).map((a,i)=>({
    id:a.id||"global_asset_"+i,
    name:a.name||"Asset",
    type:(a.role||"asset").includes("signature")?"signature":((a.role||"asset").includes("logo")?"image":"image"),
    category:(a.role||"").includes("signature")?"signatures":((a.role||"").includes("logo")?"logos":"images"),
    pack:"imports",
    favorite:!!a.favorite,
    tags:a.tags||["import"],
    src:a.src,
    seed:false,
    global:true
  }));
  return [...seed,...user,...existingAssets];
}
function allStudioTemplates(){
  return [...(studioTemplatesSeed||[]),...(state.studio.library.templates||[])];
}
function renderStudioLibrary(){
  if(!$("studioLibraryGrid")) return;
  const lib=state.studio.library;
  populateStudioLibraryFilters();
  const q=($("studioLibrarySearch")?.value||lib.search||"").toLowerCase();
  const cat=$("studioLibraryCategory")?.value||lib.selectedCategory||"all";
  const pack=$("studioLibraryPack")?.value||lib.selectedPack||"all";
  const list=allStudioLibraryAssets().filter(a=>{
    const text=((a.name||"")+" "+(a.type||"")+" "+(a.category||"")+" "+(a.pack||"")+" "+(a.tags||[]).join(" ")).toLowerCase();
    return (!q||text.includes(q))&&(cat==="all"||a.category===cat)&&(pack==="all"||a.pack===pack);
  });
  $("studioLibraryGrid").innerHTML=list.length?list.map(a=>`<div class="studio-library-card ${a.favorite?"favorite":""}" draggable="true" data-lib-asset="${esc(a.id)}">
    <button class="fav" data-lib-fav="${esc(a.id)}">${a.favorite?"★":"☆"}</button>
    <div class="studio-library-preview">${studioLibraryPreview(a)}</div>
    <strong>${esc(a.name)}</strong>
    <span>${esc(a.type||"asset")} · ${(a.tags||[]).map(t=>"#"+t).join(" ")}</span>
    <em class="studio-pack-badge">${esc(a.pack||"lib")}</em>
  </div>`).join(""):`<div class="studio-mini-card"><strong>Aucun asset</strong><span>Importe ou change les filtres</span></div>`;
  document.querySelectorAll("[data-lib-asset]").forEach(el=>{
    el.onclick=e=>{if(e.target.dataset.libFav)return;insertLibraryAsset(el.dataset.libAsset);};
    el.ondragstart=e=>{e.dataTransfer.setData("text/studio-asset",el.dataset.libAsset);};
  });
  document.querySelectorAll("[data-lib-fav]").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleLibraryFavorite(b.dataset.libFav);});
}
function studioLibraryPreview(a){
  if(a.src)return `<img src="${a.src}" alt="">`;
  if(a.type==="background")return `<span style="display:block;width:100%;height:100%;background:${a.color||"#ecc764"}"></span>`;
  if(a.type==="stamp")return `<span style="border:2px solid currentColor;padding:4px 8px;transform:rotate(-6deg)">${esc(a.text||"VALIDÉ")}</span>`;
  if(a.type==="icon")return `<span>${esc(a.text||"☎")}</span>`;
  if(a.type==="shape")return `<span>${esc(a.shape||"shape")}</span>`;
  return `<span>${esc(a.name||"asset")}</span>`;
}
function populateStudioLibraryFilters(){
  const catSel=$("studioLibraryCategory"), packSel=$("studioLibraryPack");
  if(catSel && catSel.options.length<=1){
    catSel.innerHTML=`<option value="all">Toutes catégories</option>`+(studioLibrarySeed.categories||[]).map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("")+`<option value="images">Images importées</option>`;
  }
  if(packSel && packSel.options.length<=1){
    packSel.innerHTML=`<option value="all">Tous packs</option>`+(studioLibrarySeed.packs||[]).map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join("")+`<option value="imports">Imports</option>`;
  }
}
function toggleLibraryFavorite(id){
  apply(()=>{
    const u=state.studio.library.assets.find(a=>a.id===id);
    if(u){u.favorite=!u.favorite;return;}
    const s=(studioLibrarySeed.assets||[]).find(a=>a.id===id);
    if(s){s.favorite=!s.favorite;}
    const g=state.assets.find(a=>(a.id||a.name)===id);
    if(g)g.favorite=!g.favorite;
  },false);
}
function insertLibraryAsset(id){
  const a=allStudioLibraryAssets().find(x=>x.id===id);
  if(!a)return;
  if(a.src)return addStudioImage(a.src,a.name);
  if(a.type==="background")return apply(()=>{studioPage().bg=a.color||"#ffffff";},false);
  if(a.type==="stamp"){
    const p=studioPage();
    const obj={id:"obj_"+Date.now(),type:"stamp",shape:"stamp",text:a.text||"VALIDÉ",x:100,y:100,w:190,h:70,fill:"#273540",opacity:1,rotate:-6,z:maxStudioZ()+10};
    return apply(()=>{p.objects.push(obj);state.studio.selectedObjectId=obj.id;},false);
  }
  if(a.type==="icon"){
    const p=studioPage();
    const obj={id:"obj_"+Date.now(),type:"text",shape:"text",text:a.text||"☎",x:100,y:100,w:70,h:60,fill:"#273540",opacity:1,rotate:0,fontSize:44,z:maxStudioZ()+10};
    return apply(()=>{p.objects.push(obj);state.studio.selectedObjectId=obj.id;},false);
  }
  if(a.type==="shape" && a.shape){
    addStudioElement(a.shape==="badge"?"badge":"rect");
  }
}
function renderStudioTemplates(){
  if(!$("studioTemplatesGrid"))return;
  populateStudioTemplateFilters();
  const q=($("studioTemplateSearch")?.value||"").toLowerCase();
  const cat=$("studioTemplateCategory")?.value||"all";
  const fav=$("studioTemplateFavorite")?.value||"all";
  const list=allStudioTemplates().filter(t=>{
    const text=((t.name||"")+" "+(t.category||"")+" "+(t.tags||[]).join(" ")).toLowerCase();
    return (!q||text.includes(q))&&(cat==="all"||t.category===cat)&&(fav==="all"||t.favorite);
  });
  $("studioTemplatesGrid").innerHTML=list.length?list.map(t=>`<div class="studio-library-card ${t.favorite?"favorite":""}" data-studio-template="${esc(t.id)}">
    <div class="studio-template-preview"></div>
    <strong>${esc(t.name)}</strong>
    <span>${esc(t.category||"Template")} · ${(t.tags||[]).map(x=>"#"+x).join(" ")}</span>
  </div>`).join(""):`<div class="studio-mini-card"><strong>Aucun template</strong><span>Sauve une page comme template</span></div>`;
  document.querySelectorAll("[data-studio-template]").forEach(b=>b.onclick=()=>applyStudioTemplate(b.dataset.studioTemplate));
}
function populateStudioTemplateFilters(){
  const sel=$("studioTemplateCategory");
  if(sel && sel.options.length<=1){
    const cats=[...new Set(allStudioTemplates().map(t=>t.category).filter(Boolean))];
    sel.innerHTML=`<option value="all">Toutes catégories</option>`+cats.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join("");
  }
}
function applyStudioTemplate(id){
  const t=allStudioTemplates().find(x=>x.id===id);
  if(!t||!t.page)return;
  apply(()=>{
    const page=clone(t.page);
    page.id="page_"+Date.now();
    page.name=t.name;
    page.objects=(page.objects||[]).map(o=>({...o,id:"obj_"+Date.now()+"_"+Math.floor(Math.random()*999)}));
    state.studio.pages.push(page);
    state.studio.selectedPage=state.studio.pages.length-1;
    state.studio.selectedObjectId="";
    const f=studioFormats.find(x=>x.w===page.w&&x.h===page.h);
    if(f)state.studio.format=f.id;
    fitStudioZoom();
  },false);
  toast("Template appliqué dans une nouvelle page.");
}
function saveStudioPageAsTemplate(){
  const p=studioPage();
  const name=prompt("Nom du template :",p.name+" template");
  if(!name)return;
  apply(()=>{
    state.studio.library.templates.unshift({
      id:"user_template_"+Date.now(),
      name,
      category:"Personnel",
      tags:["perso","studio"],
      favorite:true,
      format:state.studio.format,
      page:clone(p)
    });
  },false);
  toast("Template sauvegardé.");
}
function addSelectedObjectToLibrary(){
  const o=studioObject();
  if(!o)return toast("Sélectionne un objet Studio.");
  apply(()=>{
    state.studio.library.assets.unshift({
      id:"user_asset_"+Date.now(),
      name:o.text||o.name||o.shape||o.type,
      type:o.type==="image"?"image":(o.type==="text"?"text":(o.type==="stamp"?"stamp":"shape")),
      category:o.type==="image"?"images":(o.type==="stamp"?"stamps":"shapes"),
      pack:"personnel",
      favorite:true,
      tags:["studio","personnel"],
      src:o.src||"",
      text:o.text||"",
      shape:o.shape||"",
      color:o.fill||"#273540",
      object:clone(o)
    });
  },false);
  toast("Objet ajouté à la bibliothèque.");
}
function importStudioLibraryAssets(files){
  [...files].forEach(file=>{
    readImage(file,(src,f)=>apply(()=>{state.studio.library.assets.unshift({id:"user_asset_"+Date.now()+"_"+Math.floor(Math.random()*999),name:f.name,type:"image",category:"images",pack:"imports",favorite:false,tags:["image","import"],src});},false));
  });
  toast("Asset(s) importé(s).");
}
function exportStudioLibrary(){
  download("bibliotheque-studio-v27.json",JSON.stringify({version:"27.0",assets:state.studio.library.assets,templates:state.studio.library.templates},null,2),"application/json");
}
function importStudioLibraryJson(file){
  if(!file)return;
  const r=new FileReader();
  r.onload=()=>{try{const data=JSON.parse(r.result);apply(()=>{if(Array.isArray(data.assets))state.studio.library.assets.unshift(...data.assets);if(Array.isArray(data.templates))state.studio.library.templates.unshift(...data.templates);},false);toast("Bibliothèque importée.");}catch(e){toast("JSON bibliothèque invalide.");}};
  r.readAsText(file);
}
function bindStudioDropLibrary(){
  const canvas=$("studioCanvas");
  if(!canvas)return;
  canvas.ondragover=e=>{e.preventDefault();canvas.classList.add("studio-drop-ready");};
  canvas.ondragleave=()=>canvas.classList.remove("studio-drop-ready");
  canvas.ondrop=e=>{
    e.preventDefault();canvas.classList.remove("studio-drop-ready");
    const id=e.dataTransfer.getData("text/studio-asset");
    if(!id)return;
    insertLibraryAsset(id);
  };
}
function renderStudioLibraryV27(){
  renderStudioLibrary();
  renderStudioTemplates();
}


function defaultStudioEffects(){
  return {
    brightness:100,contrast:100,saturate:100,grayscale:0,sepia:0,blur:0,hue:0,
    shadow:false,shadowX:8,shadowY:10,shadowBlur:16,shadowColor:"#273540",
    borderWidth:0,borderColor:"#273540",radius:0,fit:"contain",flipX:false,flipY:false
  };
}
function normalizeStudioEffects(e){
  return {...defaultStudioEffects(),...(e||{})};
}
function studioFilterCss(o){
  const e=normalizeStudioEffects(o.effects);
  return `brightness(${e.brightness}%) contrast(${e.contrast}%) saturate(${e.saturate}%) grayscale(${e.grayscale}%) sepia(${e.sepia}%) blur(${e.blur}px) hue-rotate(${e.hue}deg)`;
}
function studioShadowCss(o){
  const e=normalizeStudioEffects(o.effects);
  if(!e.shadow)return "none";
  return `${e.shadowX}px ${e.shadowY}px ${e.shadowBlur}px ${hexToRgba(e.shadowColor||"#273540",.28)}`;
}
function studioBorderCss(o){
  const e=normalizeStudioEffects(o.effects);
  return e.borderWidth>0?`${e.borderWidth}px solid ${e.borderColor||"#273540"}`:objectBorder(o);
}
function studioRadiusCss(o){
  const e=normalizeStudioEffects(o.effects);
  if(e.radius>0)return `${e.radius}px`;
  if(o.shape==="circle")return "999px";
  if(o.shape==="round"||o.shape==="badge")return "18px";
  return "0";
}
function hasStudioEffects(o){
  const e=normalizeStudioEffects(o.effects);
  const d=defaultStudioEffects();
  return Object.keys(d).some(k=>String(e[k])!==String(d[k]));
}
function hexToRgba(hex,alpha=.3){
  const h=String(hex||"#000000").replace("#","");
  const full=h.length===3?h.split("").map(c=>c+c).join(""):h;
  const n=parseInt(full,16);
  const r=(n>>16)&255,g=(n>>8)&255,b=n&255;
  return `rgba(${r},${g},${b},${alpha})`;
}
function renderStudioEffects(){
  if(!$("studioEffectsPresets"))return;
  const o=studioObject();
  if($("studioEffectsTarget")) $("studioEffectsTarget").textContent=o?`${o.type} · ${o.text||o.name||o.shape||"objet"}`:"Sélectionne un objet";
  $("studioEffectsPresets").innerHTML=(studioEffectsSeed.presets||[]).map(p=>`<button class="fx-preset" data-fx-preset="${p.id}">${esc(p.name)}</button>`).join("");
  document.querySelectorAll("[data-fx-preset]").forEach(b=>b.onclick=()=>applyStudioEffectPreset(b.dataset.fxPreset));
  syncStudioEffectControls();
}
function syncStudioEffectControls(){
  const o=studioObject();
  const e=normalizeStudioEffects(o?.effects);
  const pairs=[
    ["fxBrightness","brightness","%","fxBrightnessLabel"],
    ["fxContrast","contrast","%","fxContrastLabel"],
    ["fxSaturate","saturate","%","fxSaturateLabel"],
    ["fxGrayscale","grayscale","%","fxGrayscaleLabel"],
    ["fxSepia","sepia","%","fxSepiaLabel"],
    ["fxBlur","blur","px","fxBlurLabel"],
    ["fxHue","hue","°","fxHueLabel"],
    ["fxShadowBlur","shadowBlur","","fxShadowBlurLabel"],
    ["fxRadius","radius","px","fxRadiusLabel"]
  ];
  pairs.forEach(([id,key,unit,label])=>{if($(id)){$(id).disabled=!o;$(id).value=e[key];} if($(label))$(label).textContent=(e[key]??0)+unit;});
  [["fxShadow","shadow"],["fxFlipX","flipX"],["fxFlipY","flipY"]].forEach(([id,key])=>{if($(id)){ $(id).disabled=!o; $(id).checked=!!e[key]; }});
  [["fxShadowX","shadowX"],["fxShadowY","shadowY"],["fxShadowColor","shadowColor"],["fxBorderWidth","borderWidth"],["fxBorderColor","borderColor"],["fxFit","fit"]].forEach(([id,key])=>{if($(id)){ $(id).disabled=!o; $(id).value=e[key]; }});
}
function updateStudioEffect(key,value){
  const o=studioObject(); if(!o)return;
  apply(()=>{o.effects=normalizeStudioEffects(o.effects);o.effects[key]=value;},false);
}
function applyStudioEffectPreset(id){
  const o=studioObject(); if(!o)return toast("Sélectionne un objet.");
  const preset=(studioEffectsSeed.presets||[]).find(p=>p.id===id);
  if(!preset)return;
  apply(()=>{o.effects={...normalizeStudioEffects(o.effects),...defaultStudioEffects(),...(preset.filters||{})};},false);
  toast("Preset appliqué.");
}
function resetStudioEffects(){
  const o=studioObject(); if(!o)return;
  apply(()=>{o.effects=defaultStudioEffects();},false);
}
function copyStudioEffects(){
  const o=studioObject(); if(!o)return toast("Sélectionne un objet.");
  copiedStudioEffects=clone(normalizeStudioEffects(o.effects));
  toast("Effets copiés.");
}
function pasteStudioEffects(){
  const o=studioObject(); if(!o||!copiedStudioEffects)return toast("Aucun effet à coller.");
  apply(()=>{o.effects=clone(copiedStudioEffects);},false);
}
function bindStudioEffects(){
  const numeric=[
    ["fxBrightness","brightness"],["fxContrast","contrast"],["fxSaturate","saturate"],["fxGrayscale","grayscale"],
    ["fxSepia","sepia"],["fxBlur","blur"],["fxHue","hue"],["fxShadowBlur","shadowBlur"],["fxShadowX","shadowX"],
    ["fxShadowY","shadowY"],["fxBorderWidth","borderWidth"],["fxRadius","radius"]
  ];
  numeric.forEach(([id,key])=>{if($(id))$(id).oninput=()=>updateStudioEffect(key,Number($(id).value));});
  [["fxShadow","shadow"],["fxFlipX","flipX"],["fxFlipY","flipY"]].forEach(([id,key])=>{if($(id))$(id).onchange=()=>updateStudioEffect(key,$(id).checked);});
  [["fxShadowColor","shadowColor"],["fxBorderColor","borderColor"],["fxFit","fit"]].forEach(([id,key])=>{if($(id))$(id).oninput=()=>updateStudioEffect(key,$(id).value);});
  if($("studioResetEffectsBtn"))$("studioResetEffectsBtn").onclick=()=>resetStudioEffects();
  if($("studioCopyEffectsBtn"))$("studioCopyEffectsBtn").onclick=()=>copyStudioEffects();
  if($("studioPasteEffectsBtn"))$("studioPasteEffectsBtn").onclick=()=>pasteStudioEffects();
}
function applyCanvasEffects(ctx,o){
  const e=normalizeStudioEffects(o.effects);
  ctx.filter=studioFilterCss(o);
  ctx.shadowColor=e.shadow?hexToRgba(e.shadowColor,.35):"transparent";
  ctx.shadowBlur=e.shadow?Number(e.shadowBlur||0):0;
  ctx.shadowOffsetX=e.shadow?Number(e.shadowX||0):0;
  ctx.shadowOffsetY=e.shadow?Number(e.shadowY||0):0;
}
function clearCanvasEffects(ctx){
  ctx.filter="none";
  ctx.shadowColor="transparent";
  ctx.shadowBlur=0;
  ctx.shadowOffsetX=0;
  ctx.shadowOffsetY=0;
}
function canvasObjectRadius(o){
  return Math.max(0,Number(normalizeStudioEffects(o.effects).radius||0));
}
function canvasDrawBorder(ctx,o){
  const e=normalizeStudioEffects(o.effects);
  if(e.borderWidth>0){
    ctx.save();
    ctx.filter="none";
    ctx.shadowColor="transparent";
    ctx.lineWidth=e.borderWidth;
    ctx.strokeStyle=e.borderColor||"#273540";
    const r=canvasObjectRadius(o);
    if(o.shape==="circle"){
      ctx.beginPath();ctx.arc(o.w/2,o.h/2,Math.min(o.w,o.h)/2-e.borderWidth/2,0,Math.PI*2);ctx.stroke();
    }else{
      roundedRect(ctx,e.borderWidth/2,e.borderWidth/2,o.w-e.borderWidth,o.h-e.borderWidth,r);ctx.stroke();
    }
    ctx.restore();
  }
}
function fitDrawImageMode(ctx,img,x,y,w,h,mode="contain"){
  if(mode==="fill"){ctx.drawImage(img,x,y,w,h);return;}
  const r=mode==="cover"?Math.max(w/img.width,h/img.height):Math.min(w/img.width,h/img.height);
  const iw=img.width*r, ih=img.height*r;
  ctx.drawImage(img,x+(w-iw)/2,y+(h-ih)/2,iw,ih);
}


function renderStudioAi(){
  if(!$("studioAiPrompt")) return;
  populateStudioAiSelects();
  if(!state.studio.ai.prompt && $("studioAiPrompt").value) state.studio.ai.prompt=$("studioAiPrompt").value;
  if($("studioAiResult") && state.studio.ai.lastPlan){
    $("studioAiResult").innerHTML=studioAiPlanHtml(state.studio.ai.lastPlan);
  }
}
function populateStudioAiSelects(){
  const fmt=$("studioAiFormat");
  if(fmt && fmt.options.length<=1){
    fmt.innerHTML=`<option value="auto">Auto</option>`+(studioFormats||[]).map(f=>`<option value="${esc(f.id)}">${esc(f.name)}</option>`).join("");
  }
  const sty=$("studioAiStyle");
  if(sty && sty.options.length<=1){
    sty.innerHTML=`<option value="auto">Auto</option>`+(studioAiSeed.styles||[]).map(s=>`<option value="${esc(s.id)}">${esc(s.name)}</option>`).join("");
  }
}
function studioAiPromptText(){
  return ($("studioAiPrompt")?.value || state.studio.ai.prompt || "").trim();
}
function scoreByKeywords(text,items){
  const t=text.toLowerCase();
  return (items||[]).map(item=>{
    const score=(item.keywords||[]).reduce((n,k)=>n+(t.includes(String(k).toLowerCase())?1:0),0);
    return {...item,score};
  }).sort((a,b)=>b.score-a.score);
}
function studioAiAnalyzePrompt(prompt){
  const chosenFormat=$("studioAiFormat")?.value||"auto";
  const chosenStyle=$("studioAiStyle")?.value||"auto";
  const intentScores=scoreByKeywords(prompt,studioAiSeed.intents||[]);
  const styleScores=scoreByKeywords(prompt,studioAiSeed.styles||[]);
  const layoutScores=scoreByKeywords(prompt,studioAiSeed.layouts||[]);
  const intent=intentScores[0]?.score>0?intentScores[0]:(studioAiSeed.intents||[])[0];
  const style=chosenStyle!=="auto"?(studioAiSeed.styles||[]).find(s=>s.id===chosenStyle):(styleScores[0]?.score>0?styleScores[0]:(studioAiSeed.styles||[])[0]);
  const layout=layoutScores[0]?.score>0?layoutScores[0]:(studioAiSeed.layouts||[])[0];
  const format=chosenFormat!=="auto"?chosenFormat:(intent?.format||"signature-email");
  return {prompt,intent,style,layout,format,createdAt:new Date().toISOString()};
}
function studioAiGenerate(){
  const prompt=studioAiPromptText();
  if(!prompt)return toast("Écris un prompt. Même l’IA locale a besoin de matière première.");
  const plan=studioAiAnalyzePrompt(prompt);
  const page=studioAiBuildPage(plan);
  apply(()=>{
    state.studio.pages.push(page);
    state.studio.selectedPage=state.studio.pages.length-1;
    state.studio.selectedObjectId="";
    state.studio.format=plan.format;
    state.studio.ai.prompt=prompt;
    state.studio.ai.lastPlan=plan;
    state.studio.ai.history.unshift(plan);
    state.studio.ai.history=state.studio.ai.history.slice(0,20);
    fitStudioZoom();
  },false);
  if($("studioAiResult"))$("studioAiResult").innerHTML=studioAiPlanHtml(plan)+`<div class="ok">Design généré dans une nouvelle page.</div>`;
  toast("Design IA local généré.");
}
function studioAiBuildPage(plan){
  const fmt=(studioFormats||[]).find(f=>f.id===plan.format) || {w:1200,h:400,name:"Page IA"};
  const palette=plan.style?.palette || ["#273540","#ecc764","#ffffff"];
  const title=studioAiTitleFromPrompt(plan.prompt, plan.intent?.name || "Design");
  const subtitle=studioAiSubtitleFromPrompt(plan.prompt);
  const objects=[];
  let z=1;
  const add=o=>{objects.push({opacity:1,rotate:0,...o,z:z++,effects:normalizeStudioEffects(o.effects)});};
  if(plan.layout?.id==="split" || plan.format==="signature-email" || plan.format==="mail-card"){
    add({id:"ai_bg_"+Date.now(),type:"shape",shape:"rect",x:0,y:0,w:fmt.w,h:fmt.h,fill:palette[0]});
    add({id:"ai_band_"+Date.now(),type:"shape",shape:"rect",x:0,y:0,w:Math.round(fmt.w*.32),h:fmt.h,fill:palette[1]});
    add({id:"ai_logo_"+Date.now(),type:"placeholder",shape:"logo",x:Math.round(fmt.w*.06),y:Math.round(fmt.h*.25),w:Math.round(fmt.w*.18),h:Math.round(fmt.h*.28),fill:"#ffffff",text:"LOGO",effects:{...defaultStudioEffects(),radius:16}});
    add({id:"ai_title_"+Date.now(),type:"text",shape:"text",x:Math.round(fmt.w*.38),y:Math.round(fmt.h*.18),w:Math.round(fmt.w*.52),h:Math.round(fmt.h*.18),fill:palette[2]||"#fff",fontSize:Math.round(fmt.h*.11),text:title});
    add({id:"ai_sub_"+Date.now(),type:"text",shape:"text",x:Math.round(fmt.w*.38),y:Math.round(fmt.h*.40),w:Math.round(fmt.w*.50),h:Math.round(fmt.h*.12),fill:palette[1],fontSize:Math.round(fmt.h*.06),text:subtitle});
    add({id:"ai_contact_"+Date.now(),type:"text",shape:"text",x:Math.round(fmt.w*.38),y:Math.round(fmt.h*.60),w:Math.round(fmt.w*.50),h:Math.round(fmt.h*.26),fill:palette[2]||"#fff",fontSize:Math.round(fmt.h*.05),text:"☎ +33 0 00 00 00 00\
✉ prenom.nom@ragt.com\
◎ www.ragt.com"});
  }else if(plan.layout?.id==="document" || plan.format==="a4-portrait"){
    add({id:"ai_title_"+Date.now(),type:"text",shape:"text",x:70,y:80,w:fmt.w-140,h:90,fill:palette[0],fontSize:48,text:title});
    add({id:"ai_line_"+Date.now(),type:"shape",shape:"line",x:70,y:175,w:fmt.w-220,h:5,fill:palette[1]});
    add({id:"ai_box_"+Date.now(),type:"shape",shape:"round",x:70,y:230,w:fmt.w-140,h:Math.round(fmt.h*.46),fill:"#f8fafc",effects:{...defaultStudioEffects(),radius:22}});
    add({id:"ai_text_"+Date.now(),type:"text",shape:"text",x:95,y:260,w:fmt.w-190,h:220,fill:"#273540",fontSize:24,text:studioAiBulletText(plan.prompt)});
    add({id:"ai_stamp_"+Date.now(),type:"stamp",shape:"stamp",x:fmt.w-310,y:fmt.h-270,w:190,h:70,fill:palette[0],text:"VALIDÉ",rotate:-8});
  }else{
    add({id:"ai_bg_"+Date.now(),type:"shape",shape:"rect",x:0,y:0,w:fmt.w,h:fmt.h,fill:palette[0]});
    add({id:"ai_circle_"+Date.now(),type:"shape",shape:"circle",x:Math.round(fmt.w*.65),y:-Math.round(fmt.h*.10),w:Math.round(fmt.w*.42),h:Math.round(fmt.w*.42),fill:palette[1],effects:{...defaultStudioEffects(),blur:0}});
    add({id:"ai_title_"+Date.now(),type:"text",shape:"text",x:Math.round(fmt.w*.08),y:Math.round(fmt.h*.18),w:Math.round(fmt.w*.68),h:Math.round(fmt.h*.22),fill:palette[2]||"#fff",fontSize:Math.round(fmt.h*.075),text:title});
    add({id:"ai_sub_"+Date.now(),type:"text",shape:"text",x:Math.round(fmt.w*.08),y:Math.round(fmt.h*.46),w:Math.round(fmt.w*.70),h:Math.round(fmt.h*.16),fill:palette[1],fontSize:Math.round(fmt.h*.04),text:subtitle});
    add({id:"ai_badge_"+Date.now(),type:"shape",shape:"badge",x:Math.round(fmt.w*.08),y:Math.round(fmt.h*.78),w:Math.round(fmt.w*.26),h:Math.round(fmt.h*.08),fill:palette[1],text:"RAGT",effects:{...defaultStudioEffects(),shadow:true,shadowBlur:18}});
  }
  return {id:"page_ai_"+Date.now(),name:"IA · "+(plan.intent?.name||"Design"),w:fmt.w,h:fmt.h,bg:"#ffffff",objects};
}
function studioAiTitleFromPrompt(prompt,fallback){
  const cleaned=prompt.replace(/créer|faire|générer|une|un|avec|pour/gi," ").replace(/\s+/g," ").trim();
  const words=cleaned.split(" ").filter(Boolean).slice(0,5).join(" ");
  return words ? words.charAt(0).toUpperCase()+words.slice(1) : fallback;
}
function studioAiSubtitleFromPrompt(prompt){
  if(/moderne|premium|élégant/i.test(prompt))return "Une mise en page moderne, claire et professionnelle.";
  if(/agri|agriculture|nature/i.test(prompt))return "Une identité visuelle orientée terrain, innovation et agriculture.";
  if(/urgent|alerte/i.test(prompt))return "Information importante à lire rapidement.";
  return "Créé automatiquement depuis un prompt local.";
}
function studioAiBulletText(prompt){
  const parts=prompt.split(/[,.:\n]/).map(x=>x.trim()).filter(Boolean).slice(0,5);
  const base=parts.length?parts:["Résumé du document","Points clés","Actions attendues"];
  return base.map(x=>"• "+x).join("\n");
}
function studioAiPlanHtml(plan){
  return `<div><strong>Analyse IA locale</strong></div>
    <div>Intention : <span class="ai-generated-badge">${esc(plan.intent?.name||"Auto")}</span></div>
    <div>Style : <span class="ai-generated-badge">${esc(plan.style?.name||"Auto")}</span></div>
    <div>Layout : <span class="ai-generated-badge">${esc(plan.layout?.name||"Auto")}</span></div>
    <div>Format : <span class="ai-generated-badge">${esc(plan.format||"Auto")}</span></div>`;
}
function studioAiSuggestLayout(){
  const prompt=studioAiPromptText();
  const plan=studioAiAnalyzePrompt(prompt||"signature corporate");
  state.studio.ai.lastPlan=plan;
  if($("studioAiResult"))$("studioAiResult").innerHTML=studioAiPlanHtml(plan)+`
    <br><div class="ok">Suggestion : ${esc(plan.layout?.name||"Layout auto")}</div>
    <div>Palette : ${(plan.style?.palette||[]).map(c=>`<span class="ai-generated-badge">${c}</span>`).join(" ")}</div>`;
  autoSave();
}
function studioAiBrandCheck(){
  const page=studioPage();
  const rules=studioAiSeed.brandRules||{};
  const allowed=rules.colors||["#273540","#ecc764","#ffffff"];
  const issues=[];
  const warnings=[];
  const hasLogo=page.objects.some(o=>o.shape==="logo"||/logo/i.test(o.text||""));
  const colors=[...new Set(page.objects.map(o=>String(o.fill||"").toLowerCase()).filter(Boolean))];
  const outside=colors.filter(c=>/^#/.test(c) && !allowed.map(x=>x.toLowerCase()).includes(c));
  if(!hasLogo && ["signature-email","mail-card","a4-portrait"].includes(state.studio.format)) warnings.push("Logo recommandé sur ce format.");
  if(outside.length) warnings.push("Couleurs hors charte détectées : "+outside.join(", "));
  if(page.objects.some(o=>o.type==="text" && (o.fontSize||0)<16)) warnings.push("Texte très petit détecté.");
  if(!page.objects.length) issues.push("Page vide.");
  if($("studioAiResult"))$("studioAiResult").innerHTML=`<div><strong>Contrôle charte local</strong></div>
    ${issues.length?issues.map(x=>`<div class="ko">• ${esc(x)}</div>`).join(""):`<div class="ok">Aucune erreur bloquante.</div>`}
    ${warnings.length?warnings.map(x=>`<div class="warn">• ${esc(x)}</div>`).join(""):`<div class="ok">Aucune alerte majeure.</div>`}
    <br><div>${esc(rules.fontNotice||"Police sobre recommandée.")}</div>`;
}
function studioAiAdaptFormat(){
  const target=$("studioAiFormat")?.value||"auto";
  if(target==="auto")return toast("Choisis un format cible.");
  const fmt=studioFormats.find(f=>f.id===target);
  if(!fmt)return;
  const p=studioPage();
  const sx=fmt.w/p.w, sy=fmt.h/p.h;
  const scale=Math.min(sx,sy);
  const newPage=clone(p);
  newPage.id="page_adapt_"+Date.now();
  newPage.name=p.name+" → "+fmt.name;
  newPage.w=fmt.w; newPage.h=fmt.h;
  newPage.objects=newPage.objects.map(o=>({...o,id:"obj_"+Date.now()+"_"+Math.floor(Math.random()*999),x:Math.round(o.x*scale),y:Math.round(o.y*scale),w:Math.round(o.w*scale),h:Math.round(o.h*scale),fontSize:o.fontSize?Math.max(12,Math.round(o.fontSize*scale)):o.fontSize}));
  apply(()=>{state.studio.pages.push(newPage);state.studio.selectedPage=state.studio.pages.length-1;state.studio.format=fmt.id;state.studio.selectedObjectId="";fitStudioZoom();},false);
  if($("studioAiResult"))$("studioAiResult").innerHTML=`<div class="ok">Format adapté vers ${esc(fmt.name)}.</div><div>Objets redimensionnés proportionnellement.</div>`;
}
function studioAiDocToVisual(){
  const doc=selectedDocument();
  const prompt=studioAiPromptText();
  const text=doc && (docKind(doc)==="CSV"||docKind(doc)==="Texte") ? String(doc.src||"").slice(0,900) : prompt;
  const plan=studioAiAnalyzePrompt("affiche a4 document résumé "+text);
  plan.format=$("studioAiFormat")?.value!="auto"?$("studioAiFormat").value:"a4-portrait";
  const page=studioAiBuildPage({...plan,prompt:text||prompt||"Résumé document"});
  page.name="Document → visuel";
  apply(()=>{state.studio.pages.push(page);state.studio.selectedPage=state.studio.pages.length-1;state.studio.format=plan.format;state.studio.selectedObjectId="";fitStudioZoom();},false);
  if($("studioAiResult"))$("studioAiResult").innerHTML=studioAiPlanHtml(plan)+`<div class="ok">Visuel généré depuis ${doc?esc(doc.name):"le prompt"}.</div>`;
}
function studioAiVariants(){
  const count=Number($("studioAiVariantCount")?.value||3);
  const prompt=studioAiPromptText()||"signature RAGT corporate";
  const base=studioAiAnalyzePrompt(prompt);
  const styles=(studioAiSeed.styles||[]).slice(0,Math.max(count,3));
  apply(()=>{
    for(let i=0;i<count;i++){
      const style=styles[(i+(styles.findIndex(s=>s.id===base.style?.id)+1))%styles.length]||base.style;
      const layout=(studioAiSeed.layouts||[])[i%(studioAiSeed.layouts||[]).length]||base.layout;
      const plan={...base,style,layout,createdAt:new Date().toISOString()};
      const page=studioAiBuildPage(plan);
      page.name=`Variante IA ${i+1} · ${style?.name||"Style"}`;
      state.studio.pages.push(page);
    }
    state.studio.selectedPage=state.studio.pages.length-1;
    state.studio.selectedObjectId="";
    state.studio.ai.lastPlan=base;
    fitStudioZoom();
  },false);
  if($("studioAiResult"))$("studioAiResult").innerHTML=`<div class="ok">${count} variantes créées.</div>`+studioAiPlanHtml(base);
}
function bindStudioAi(){
  if($("studioAiPrompt"))$("studioAiPrompt").oninput=()=>{state.studio.ai.prompt=$("studioAiPrompt").value;autoSave();};
  if($("studioAiGenerateBtn"))$("studioAiGenerateBtn").onclick=()=>studioAiGenerate();
  if($("studioAiApiGenerateBtn"))$("studioAiApiGenerateBtn").onclick=async ()=>{
    const p = studioAiPromptText();
    if(!p) return toast("Écris un prompt pour l'IA.");
    toast("Appel à Gemini...");
    const res = await callGemini("Tu es un assistant créatif pour Signature Studio. Basé sur ce prompt, suggère une mise en page JSON (intent, style, layout, format). Prompt: " + p);
    if(res) {
      if($("studioAiResult")) $("studioAiResult").innerHTML = `<div class="p-4 bg-[#f0f9ff] text-[#273540] rounded-xl border border-[#e9eaeb] text-xs font-mono whitespace-pre-wrap">${res}</div>`;
      toast("Réponse Gemini reçue.");
    }
  };
  if($("studioAiSuggestBtn"))$("studioAiSuggestBtn").onclick=()=>studioAiSuggestLayout();
  if($("studioAiBrandCheckBtn"))$("studioAiBrandCheckBtn").onclick=()=>studioAiBrandCheck();
  if($("studioAiAdaptBtn"))$("studioAiAdaptBtn").onclick=()=>studioAiAdaptFormat();
  if($("studioAiDocVisualBtn"))$("studioAiDocVisualBtn").onclick=()=>studioAiDocToVisual();
  if($("studioAiVariantsBtn"))$("studioAiVariantsBtn").onclick=()=>studioAiVariants();
}


function currentCollabRole(){
  return (collabSeed.roles||[]).find(r=>r.id===state.collaboration.role) || (collabSeed.roles||[])[0] || {permissions:[]};
}
function collabCan(permission){
  return (currentCollabRole().permissions||[]).includes(permission);
}
function collabLog(action,detail=""){
  state.collaboration.activity.unshift({id:"act_"+Date.now(),user:state.collaboration.user,role:state.collaboration.role,action,detail,at:new Date().toISOString()});
  state.collaboration.activity=state.collaboration.activity.slice(0,80);
}
function renderCollaboration(){
  if(!$("collabWorkflow")) return;
  syncCollabControls();
  renderCollabWorkflow();
  renderCollabPermissions();
  renderCollabComments();
  renderCollabVersions();
  renderCollabActivity();
  renderCollabServicePacks();
  renderCollabBrandReport();
  renderCollabPublishSummary();
}
function syncCollabControls(){
  if($("collabUserName"))$("collabUserName").value=state.collaboration.user||"";
  if($("collabRole"))$("collabRole").value=state.collaboration.role||"admin";
  if($("collabStatus"))$("collabStatus").value=state.collaboration.status||"draft";
  if($("collabBrandLock"))$("collabBrandLock").checked=!!state.collaboration.brandLock;
}
function renderCollabWorkflow(){
  const steps=collabSeed.workflow||[];
  const currentIndex=steps.findIndex(s=>s.id===state.collaboration.status);
  $("collabWorkflow").innerHTML=steps.map((s,i)=>`<div class="workflow-step ${s.id===state.collaboration.status?"active":(i<currentIndex?"done":"")}">
    <strong>${esc(s.name)}</strong><span>${esc(s.description||"")}</span>
  </div>`).join("");
}
function renderCollabPermissions(){
  if(!$("collabPermissions"))return;
  const all=["create","edit","delete","comment","saveVersion","requestReview","approve","requestChanges","publish","lockBrand","managePacks","restoreVersion"];
  $("collabPermissions").innerHTML=all.map(p=>`<div class="permission-pill ${collabCan(p)?"ok":"ko"}"><span>${esc(p)}</span><strong>${collabCan(p)?"OK":"KO"}</strong></div>`).join("");
}
function renderCollabComments(){
  if(!$("collabCommentsList"))return;
  $("collabCommentsList").innerHTML=state.collaboration.comments.length?state.collaboration.comments.map(c=>`<div class="collab-item">
    <strong>${esc(c.user)} · ${esc(c.role)}</strong><span>${new Date(c.at).toLocaleString("fr-FR")} · ${esc(c.status||"commentaire")}</span><p>${esc(c.text)}</p>
  </div>`).join(""):`<div class="collab-item"><strong>Aucun commentaire</strong><span>La paix, ou l’oubli. Difficile à dire.</span></div>`;
}
function renderCollabVersions(){
  if(!$("collabVersionsList"))return;
  $("collabVersionsList").innerHTML=state.collaboration.versions.length?state.collaboration.versions.map(v=>`<div class="collab-item">
    <strong>${esc(v.name)}</strong><span>${new Date(v.at).toLocaleString("fr-FR")} · ${esc(v.user)}</span>
    <p>${v.pagesCount} page(s), ${v.objectsCount} objet(s)</p>
    <button data-restore-version="${esc(v.id)}" class="secondary">Restaurer</button>
  </div>`).join(""):`<div class="collab-item"><strong>Aucune version</strong><span>Sauve une version avant qu’un humain ne casse tout.</span></div>`;
  document.querySelectorAll("[data-restore-version]").forEach(b=>b.onclick=()=>restoreCollabVersion(b.dataset.restoreVersion));
}
function renderCollabActivity(){
  if(!$("collabActivityList"))return;
  $("collabActivityList").innerHTML=state.collaboration.activity.length?state.collaboration.activity.map(a=>`<div class="collab-item">
    <strong>${esc(a.action)}</strong><span>${new Date(a.at).toLocaleString("fr-FR")} · ${esc(a.user)}</span><p>${esc(a.detail||"")}</p>
  </div>`).join(""):`<div class="collab-item"><strong>Aucune activité</strong><span>Pour l’instant personne n’a tout renversé.</span></div>`;
}
function renderCollabServicePacks(){
  if(!$("collabServicePacks"))return;
  $("collabServicePacks").innerHTML=(collabSeed.servicePacks||[]).map(p=>`<div class="collab-pack" data-service-pack="${esc(p.id)}">
    <strong>${esc(p.name)}</strong><span>${esc(p.description)}</span>
  </div>`).join("");
  document.querySelectorAll("[data-service-pack]").forEach(b=>b.onclick=()=>applyCollabServicePack(b.dataset.servicePack));
}
function collabBrandCheckData(){
  const page=studioPage();
  const policy=collabSeed.brandPolicy||{};
  const allowed=(policy.allowedColors||[]).map(c=>String(c).toLowerCase());
  const warnings=[];
  const errors=[];
  const colors=[...new Set((page.objects||[]).map(o=>String(o.fill||"").toLowerCase()).filter(c=>c.startsWith("#")))];
  const outside=colors.filter(c=>!allowed.includes(c));
  if(outside.length && state.collaboration.brandLock) errors.push("Couleurs hors charte verrouillée : "+outside.join(", "));
  else if(outside.length) warnings.push("Couleurs hors charte : "+outside.join(", "));
  const needsLogo=(policy.requiredLogoFormats||[]).includes(state.studio.format);
  const hasLogo=(page.objects||[]).some(o=>o.shape==="logo"||/logo/i.test(o.text||""));
  if(needsLogo&&!hasLogo) warnings.push("Logo recommandé pour ce format.");
  if((page.objects||[]).length===0) errors.push("Page vide.");
  const tiny=(page.objects||[]).filter(o=>o.type==="text" && (o.fontSize||0)<16).length;
  if(tiny) warnings.push(`${tiny} texte(s) très petit(s).`);
  return {errors,warnings,ok:errors.length===0 && warnings.length <= (policy.maxWarningsBeforeApproval||2)};
}
function renderCollabBrandReport(){
  if(!$("collabBrandReport"))return;
  const r=collabBrandCheckData();
  $("collabBrandReport").innerHTML=`${r.errors.length?r.errors.map(e=>`<div class="ko">• ${esc(e)}</div>`).join(""):`<div class="ok">Aucune erreur bloquante.</div>`}
    ${r.warnings.length?r.warnings.map(w=>`<div class="warn">• ${esc(w)}</div>`).join(""):`<div class="ok">Aucune alerte majeure.</div>`}
    <br><div>Charte verrouillée : <strong>${state.collaboration.brandLock?"oui":"non"}</strong></div>
    <div>Validation : <strong class="${r.ok?"ok":"ko"}">${r.ok?"possible":"à corriger"}</strong></div>`;
}
function renderCollabPublishSummary(){
  if(!$("collabPublishSummary"))return;
  $("collabPublishSummary").innerHTML=state.collaboration.publishedAt
    ? `Publié le ${new Date(state.collaboration.publishedAt).toLocaleString("fr-FR")}<br>Version : ${esc(state.collaboration.publishedVersionId||"")}`
    : "Aucune publication.";
}
function addCollabComment(status="commentaire"){
  if(!collabCan("comment") && state.collaboration.role!=="admin") return toast("Permission refusée. L’illusion du pouvoir s’arrête ici.");
  const text=($("collabCommentText")?.value||"").trim();
  if(!text)return toast("Commentaire vide.");
  apply(()=>{
    state.collaboration.comments.unshift({id:"com_"+Date.now(),user:state.collaboration.user,role:state.collaboration.role,text,status,at:new Date().toISOString(),page:studioPage().name});
    collabLog("commentaire",text.slice(0,90));
  },false);
  if($("collabCommentText"))$("collabCommentText").value="";
}
function saveCollabVersion(name="Version sauvegardée"){
  if(!collabCan("saveVersion") && !collabCan("create")) return toast("Permission refusée pour sauvegarder une version.");
  const pages=clone(state.studio.pages);
  const objectsCount=pages.reduce((n,p)=>n+(p.objects||[]).length,0);
  const version={id:"ver_"+Date.now(),name:`${name} ${state.collaboration.versions.length+1}`,user:state.collaboration.user,role:state.collaboration.role,status:state.collaboration.status,at:new Date().toISOString(),pages,pagesCount:pages.length,objectsCount};
  apply(()=>{state.collaboration.versions.unshift(version);collabLog("version",version.name);},false);
  toast("Version sauvegardée.");
}
function restoreCollabVersion(id){
  if(!collabCan("restoreVersion"))return toast("Permission refusée pour restaurer.");
  const v=state.collaboration.versions.find(x=>x.id===id);
  if(!v)return;
  apply(()=>{state.studio.pages=clone(v.pages);state.studio.selectedPage=0;state.studio.selectedObjectId="";collabLog("restauration",v.name);fitStudioZoom();},false);
  toast("Version restaurée.");
}
function collabSetStatus(status,detail=""){
  apply(()=>{state.collaboration.status=status;collabLog("statut",`${status} ${detail}`);},false);
}
function collabRequestReview(){
  if(!collabCan("requestReview"))return toast("Permission refusée.");
  saveCollabVersion("Soumission validation");
  collabSetStatus("review","demande de validation");
}
function collabApprove(){
  if(!collabCan("approve"))return toast("Permission refusée.");
  const check=collabBrandCheckData();
  if(!check.ok)return toast("Validation refusée : charte à corriger.");
  apply(()=>{
    state.collaboration.approvals.unshift({id:"app_"+Date.now(),user:state.collaboration.user,role:state.collaboration.role,at:new Date().toISOString(),page:studioPage().name});
    state.collaboration.status="approved";
    collabLog("approbation","Projet approuvé");
  },false);
  toast("Projet approuvé.");
}
function collabRequestChanges(){
  if(!collabCan("requestChanges"))return toast("Permission refusée.");
  addCollabComment("corrections");
  collabSetStatus("changes","corrections demandées");
}
function collabPublish(){
  if(!collabCan("publish"))return toast("Permission refusée.");
  if(state.collaboration.status!=="approved")return toast("Publication refusée : le projet doit être approuvé.");
  saveCollabVersion("Publication");
  apply(()=>{state.collaboration.status="published";state.collaboration.publishedAt=new Date().toISOString();state.collaboration.publishedVersionId=state.collaboration.versions[0]?.id||"";collabLog("publication","Projet publié");},false);
  toast("Projet publié.");
}
function applyCollabServicePack(id){
  if(!collabCan("managePacks") && !collabCan("create"))return toast("Permission refusée.");
  const pack=(collabSeed.servicePacks||[]).find(p=>p.id===id);
  if(!pack)return;
  const oldPrompt=$("studioAiPrompt")?.value||"";
  if($("studioAiPrompt"))$("studioAiPrompt").value=`Créer un support ${pack.name} : ${pack.description}. Style ${pack.style}.`;
  if($("studioAiFormat"))$("studioAiFormat").value=pack.format||"auto";
  if($("studioAiStyle"))$("studioAiStyle").value=pack.style||"auto";
  studioAiGenerate();
  apply(()=>{collabLog("pack service",`Pack appliqué : ${pack.name}`);},false);
  if($("studioAiPrompt"))$("studioAiPrompt").value=oldPrompt;
}
function exportCollabReport(){
  const report={
    version:"30.0",
    generatedAt:new Date().toISOString(),
    user:state.collaboration.user,
    role:state.collaboration.role,
    status:state.collaboration.status,
    brandLock:state.collaboration.brandLock,
    brandReport:collabBrandCheckData(),
    comments:state.collaboration.comments,
    versions:state.collaboration.versions.map(v=>({id:v.id,name:v.name,user:v.user,role:v.role,status:v.status,at:v.at,pagesCount:v.pagesCount,objectsCount:v.objectsCount})),
    approvals:state.collaboration.approvals,
    activity:state.collaboration.activity,
    studio:{format:state.studio.format,pages:state.studio.pages.length,currentPage:studioPage().name}
  };
  download("rapport-collaboration-v30.json",JSON.stringify(report,null,2),"application/json");
}
async function exportPublishedPack(){
  const report={version:"30.0",type:"publication-pack",status:state.collaboration.status,generatedAt:new Date().toISOString(),collaboration:state.collaboration,brandReport:collabBrandCheckData()};
  const studioJson=JSON.stringify({version:"30.0",studio:state.studio},null,2);
  const reportJson=JSON.stringify(report,null,2);
  const canvas=await drawStudioToCanvas();
  const dataUrl=canvas.toDataURL("image/jpeg",.92);
  const pdfBlob=makeImagePdfFromJpegDataUrl(dataUrl,{format:"auto",canvasWidth:canvas.width,canvasHeight:canvas.height,pixelWidth:canvas.width,pixelHeight:canvas.height,title:"Publication Signature Studio v30"});
  const pdfBytes=new Uint8Array(await pdfBlob.arrayBuffer());
  const zip=makeZipBinary([
    ["publication/studio-publication-v30.pdf",pdfBytes],
    ["publication/projet-studio-v30.json",new TextEncoder().encode(studioJson)],
    ["publication/rapport-collaboration-v30.json",new TextEncoder().encode(reportJson)],
    ["README.txt",new TextEncoder().encode("Pack publication Signature Studio v30\
PDF + projet + rapport collaboration.\
")]
  ]);
  download("pack-publication-v30.zip",zip,"application/zip");
}
function bindCollaboration(){
  if($("collabUserName"))$("collabUserName").oninput=()=>apply(()=>state.collaboration.user=$("collabUserName").value,false);
  if($("collabRole"))$("collabRole").onchange=()=>apply(()=>{state.collaboration.role=$("collabRole").value;collabLog("role",state.collaboration.role);},false);
  if($("collabStatus"))$("collabStatus").onchange=()=>apply(()=>{state.collaboration.status=$("collabStatus").value;collabLog("statut manuel",state.collaboration.status);},false);
  if($("collabBrandLock"))$("collabBrandLock").onchange=()=>apply(()=>{state.collaboration.brandLock=$("collabBrandLock").checked;collabLog("charte",state.collaboration.brandLock?"verrouillée":"déverrouillée");},false);
  if($("collabAddCommentBtn"))$("collabAddCommentBtn").onclick=()=>addCollabComment();
  if($("collabSaveVersionBtn"))$("collabSaveVersionBtn").onclick=()=>saveCollabVersion();
  if($("collabRequestReviewBtn"))$("collabRequestReviewBtn").onclick=()=>collabRequestReview();
  if($("collabApproveBtn"))$("collabApproveBtn").onclick=()=>collabApprove();
  if($("collabRequestChangesBtn"))$("collabRequestChangesBtn").onclick=()=>collabRequestChanges();
  if($("collabPublishBtn"))$("collabPublishBtn").onclick=()=>collabPublish();
  if($("collabExportReportBtn"))$("collabExportReportBtn").onclick=()=>exportCollabReport();
  if($("collabExportPublishedPackBtn"))$("collabExportPublishedPackBtn").onclick=()=>exportPublishedPack();
}


function connectorProvider(){
  return (aiConnectorsSeed.providers||[]).find(p=>p.id===state.connector.provider) || (aiConnectorsSeed.providers||[])[0] || {};
}
function renderConnectors(){
  if(!$("connectorMode")) return;
  populateConnectorSelects();
  syncConnectorControls();
  renderConnectorCapabilities();
  renderConnectorSecurity();
  renderConnectorProviderInfo();
  renderConnectorRequestPreview();
  renderConnectorResponse();
  renderConnectorLog();
  renderStudioConnectorStatus();
}
function populateConnectorSelects(){
  const pSel=$("connectorProvider");
  if(pSel && pSel.options.length===0){
    pSel.innerHTML=`<option value="gemini-builtin">Gemini (Intégré - Gratuit)</option>`+(aiConnectorsSeed.providers||[]).map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join("");
  }
}
function syncConnectorControls(){
  const c=state.connector;
  if($("connectorMode"))$("connectorMode").value=c.mode||"local";
  if($("connectorProvider"))$("connectorProvider").value=c.provider||"openai-compatible";
  if($("connectorEndpoint"))$("connectorEndpoint").value=c.endpoint||"";
  if($("connectorTextModel"))$("connectorTextModel").value=c.textModel||"";
  if($("connectorImageModel"))$("connectorImageModel").value=c.imageModel||"";
  if($("connectorApiKey"))$("connectorApiKey").value=c.apiKey||"";
  if($("connectorCustomHeader"))$("connectorCustomHeader").value=c.customHeader||"X-API-Key";
  if($("connectorTimeout"))$("connectorTimeout").value=c.timeout||30000;
  if($("connectorEnabled"))$("connectorEnabled").checked=!!c.enabled;
  if($("connectorPrompt") && !$("connectorPrompt").value)$("connectorPrompt").value="Créer une signature RAGT corporate moderne, claire et conforme.";
  if($("connectorResponseMapping"))$("connectorResponseMapping").value=c.responseMapping||'{"page":"page","summary":"summary","warnings":"warnings"}';
}
function renderConnectorCapabilities(){
  if(!$("connectorCapabilities"))return;
  $("connectorCapabilities").innerHTML=(aiConnectorsSeed.capabilities||[]).map(cap=>`<label class="connector-cap ${state.connector.capabilities?.[cap.id]?"on":""}">
    <span>${esc(cap.name)}</span><input data-connector-cap="${esc(cap.id)}" type="checkbox" ${state.connector.capabilities?.[cap.id]?"checked":""}>
  </label>`).join("");
  document.querySelectorAll("[data-connector-cap]").forEach(ch=>ch.onchange=()=>apply(()=>{state.connector.capabilities[ch.dataset.connectorCap]=ch.checked;},false));
}
function renderConnectorSecurity(){
  if(!$("connectorSecurityReport"))return;
  const c=state.connector;
  const warnings=[];
  const ok=[];
  if(c.mode==="local") ok.push("Mode local : aucune donnée envoyée.");
  if(c.mode==="proxy") ok.push("Proxy recommandé : clé protégée côté serveur.");
  if(c.mode==="direct") warnings.push("Mode direct navigateur : clé exposée côté client.");
  if(c.apiKey && c.mode==="direct") warnings.push("Clé API stockée localement : uniquement pour test.");
  if(c.endpoint && !(c.endpoint.startsWith("http://")||c.endpoint.startsWith("https://"))) warnings.push("Endpoint invalide ou incomplet.");
  if(c.enabled && !c.endpoint && c.mode!=="local") warnings.push("Connecteur activé mais endpoint manquant.");
  if(!c.enabled) ok.push("Connecteur externe désactivé : fallback local.");
  $("connectorSecurityReport").innerHTML=[
    ...ok.map(x=>`<div class="ok">• ${esc(x)}</div>`),
    ...warnings.map(x=>`<div class="warn">• ${esc(x)}</div>`),
    `<br><div>Recommandation : utiliser un proxy backend DSI, pas une clé dans le navigateur. Oui, la sécurité a encore gâché la fête.</div>`
  ].join("");
}
function renderConnectorProviderInfo(){
  if(!$("connectorProviderInfo"))return;
  const p=connectorProvider();
  $("connectorProviderInfo").innerHTML=`<div><strong>${esc(p.name||"Fournisseur")}</strong></div>
    <div>${esc(p.type||"")}</div>
    <div>Mode conseillé : <span class="connector-provider-pill">${esc(p.recommendedMode||"proxy")}</span></div>
    <div>Auth : <span class="connector-provider-pill">${esc(p.auth||"")}</span></div>
    <br>${(p.notes||[]).map(n=>`<div>• ${esc(n)}</div>`).join("")}`;
}
function connectorContext(){
  const doc=selectedDocument();
  return {
    studio:{format:state.studio.format,currentPage:studioPage(),pagesCount:state.studio.pages.length},
    document:doc?{name:doc.name,type:doc.type,size:doc.size,kind:docKind(doc),text:(docKind(doc)==="CSV"||docKind(doc)==="Texte")?String(doc.src||"").slice(0,2000):""}:null,
    brand:{studioAiRules:studioAiSeed.brandRules||{},collabPolicy:collabSeed.brandPolicy||{}},
    collaboration:{role:state.collaboration.role,status:state.collaboration.status,brandLock:state.collaboration.brandLock}
  };
}
function buildConnectorRequest(mode="design",prompt=null){
  return {
    version:"31.0",
    mode,
    provider:state.connector.provider,
    model:mode==="image"?state.connector.imageModel:state.connector.textModel,
    prompt:prompt || ($("connectorPrompt")?.value || studioAiPromptText() || ""),
    context:connectorContext(),
    expectedResponse:aiConnectorsSeed.requestSchema?.expectedResponse || {summary:"string",page:"optional Studio page JSON",warnings:[],actions:[]}
  };
}
function renderConnectorRequestPreview(){
  if(!$("connectorRequestPreview"))return;
  const req=state.connector.lastRequest || buildConnectorRequest("design");
  $("connectorRequestPreview").textContent=JSON.stringify(req,null,2);
}
function renderConnectorResponse(){
  if(!$("connectorResponse"))return;
  const r=state.connector.lastResponse;
  if(!r){$("connectorResponse").innerHTML="Aucune réponse.";return;}
  $("connectorResponse").innerHTML=`<div class="${r.ok?"ok":"warn"}">${esc(r.status||"Réponse")}</div>
    <div>${esc(r.summary||"")}</div>
    ${r.warnings?.length?r.warnings.map(w=>`<div class="warn">• ${esc(w)}</div>`).join(""):""}
    ${r.actions?.length?`<br><div>${r.actions.map(a=>`<span class="connector-provider-pill">${esc(a)}</span>`).join("")}</div>`:""}`;
}
function connectorLog(kind,message,extra={}){
  state.connector.log.unshift({id:"log_"+Date.now(),kind,message,extra,at:new Date().toISOString()});
  state.connector.log=state.connector.log.slice(0,100);
}
function renderConnectorLog(){
  if(!$("connectorLog"))return;
  $("connectorLog").innerHTML=state.connector.log.length?state.connector.log.map(l=>`<div class="connector-log-item">
    <strong>${esc(l.kind)}</strong><span>${new Date(l.at).toLocaleString("fr-FR")}</span><p>${esc(l.message)}</p>
  </div>`).join(""):`<div class="connector-log-item"><strong>Journal vide</strong><span>Pour une fois, rien n’a explosé.</span></div>`;
}
function renderStudioConnectorStatus(){
  if(!$("studioAiConnectorStatus"))return;
  const c=state.connector;
  $("studioAiConnectorStatus").innerHTML=`Connecteur : <strong>${c.enabled?esc(c.provider):"mode local"}</strong> · ${esc(c.mode||"local")}`;
}
function saveConnectorConfig(){
  apply(()=>{connectorLog("config","Configuration sauvegardée.");},false);
  toast("Configuration connecteur sauvegardée.");
}
function exportConnectorConfig(){
  const c=clone(state.connector);
  if(c.apiKey)c.apiKey="*** masqué ***";
  download("configuration-connecteur-ia-v31.json",JSON.stringify({version:"31.0",connector:c},null,2),"application/json");
}
function importConnectorConfig(file){
  if(!file)return;
  const r=new FileReader();
  r.onload=()=>{try{const data=JSON.parse(r.result);apply(()=>{state.connector={...state.connector,...(data.connector||data)};if(state.connector.apiKey==="*** masqué ***")state.connector.apiKey="";connectorLog("import","Configuration importée.");},false);toast("Configuration importée.");}catch(e){toast("JSON connecteur invalide.");}};
  r.readAsText(file);
}
function prepareConnectorRequest(){
  const req=buildConnectorRequest("design");
  apply(()=>{state.connector.lastRequest=req;connectorLog("requête","Requête préparée.");},false);
  download("requete-ia-v31.json",JSON.stringify(req,null,2),"application/json");
}
async function testConnector(){
  const c=state.connector;
  if(c.mode==="local" || !c.enabled){
    apply(()=>{state.connector.lastResponse={ok:true,status:"Mode local OK",summary:"Le moteur IA local v29 est disponible.",warnings:[],actions:["local"]};connectorLog("test","Mode local testé.");},false);
    return;
  }
  if(!c.endpoint){
    apply(()=>{state.connector.lastResponse={ok:false,status:"Endpoint manquant",summary:"Aucune URL endpoint configurée.",warnings:["Renseigne un proxy ou webhook."],actions:[]};connectorLog("test","Endpoint manquant.");},false);
    return;
  }
  await runConnectorRequest("text","Ping Signature Studio v31",true);
}
async function callGemini(prompt, model = "gemini-1.5-flash", inlineData = null) {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, model, inlineData })
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || ("HTTP " + res.status));
    return data.text || data.summary || "";
  } catch (e) {
    console.warn("Gemini indisponible, fallback local", e);
    toast("IA externe indisponible : reponse locale utilisee.");
    return null;
  }
}

async function runConnectorRequest(mode="design",prompt=null,isTest=false){
  const c=state.connector;
  const req=buildConnectorRequest(mode,prompt);
  if(c.provider === "gemini-builtin") {
    const text = await callGemini(req.prompt);
    const normalized = text
      ? normalizeConnectorResponse({text}, true, 200)
      : runConnectorLocalFallback(mode,req.prompt);
    apply(()=>{state.connector.lastRequest=req;state.connector.lastResponse=normalized;connectorLog(text?"gemini":"local",text?`Appel Gemini integre : ${mode}`:`Fallback local : ${mode}`);},false);
    return normalized;
  }
  if(!c.enabled || c.mode==="local"){
    const local=runConnectorLocalFallback(mode,req.prompt);
    apply(()=>{state.connector.lastRequest=req;state.connector.lastResponse=local;connectorLog("local",`Fallback local : ${mode}`);},false);
    return local;
  }
  if(!c.endpoint){
    const res={ok:false,status:"Endpoint manquant",summary:"Connecteur activé mais aucun endpoint n’est défini.",warnings:["Configure l’URL endpoint."],actions:[]};
    apply(()=>{state.connector.lastRequest=req;state.connector.lastResponse=res;connectorLog("erreur","Endpoint manquant.");},false);
    return res;
  }
  try{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),Number(c.timeout||30000));
    const headers={"Content-Type":"application/json"};
    if(c.mode==="direct" && c.apiKey){
      if(c.customHeader && c.customHeader!=="Authorization") headers[c.customHeader]=c.apiKey;
      else headers["Authorization"]="Bearer "+c.apiKey;
    }
    const response=await fetch(c.endpoint,{method:"POST",headers,body:JSON.stringify(req),signal:controller.signal});
    clearTimeout(timeout);
    const text=await response.text();
    let data;
    try{data=JSON.parse(text);}catch(e){data={summary:text};}
    const normalized=normalizeConnectorResponse(data,response.ok,response.status);
    apply(()=>{state.connector.lastRequest=req;state.connector.lastResponse=normalized;connectorLog(response.ok?"api":"api erreur",`${response.status} ${mode}`);},false);
    if(mode==="design" && normalized.page) applyConnectorDesignResponse(normalized);
    return normalized;
  }catch(e){
    const res={ok:false,status:"Erreur API",summary:String(e.message||e),warnings:["Vérifie CORS, endpoint, proxy et réseau."],actions:[]};
    apply(()=>{state.connector.lastRequest=req;state.connector.lastResponse=res;connectorLog("exception",String(e.message||e));},false);
    return res;
  }
}
function normalizeConnectorResponse(data,ok=true,status=200){
  return {
    ok,
    status:ok?`HTTP ${status}`:`HTTP ${status}`,
    summary:data.summary || data.message || data.text || "Réponse reçue.",
    page:data.page || data.studioPage || null,
    objects:data.objects || null,
    warnings:data.warnings || [],
    actions:data.actions || []
  };
}
function runConnectorLocalFallback(mode,prompt){
  if(mode==="design"){
    const plan=studioAiAnalyzePrompt(prompt||"signature corporate");
    return {ok:true,status:"Local v29",summary:"Design généré par moteur local.",page:studioAiBuildPage(plan),warnings:["Mode local utilisé."],actions:["design-local"]};
  }
  if(mode==="brand"){
    const check=collabBrandCheckData();
    return {ok:check.ok,status:"Contrôle charte local",summary:check.ok?"Charte acceptable.":"Corrections nécessaires.",warnings:[...check.errors,...check.warnings],actions:["brand-local"]};
  }
  if(mode==="document"){
    const doc=selectedDocument();
    return {ok:true,status:"Analyse locale",summary:doc?`Document sélectionné : ${doc.name}`:"Aucun document sélectionné.",warnings:doc?[]:["Aucun document."],actions:["document-local"]};
  }
  return {ok:true,status:"Texte local",summary:"Réponse locale simulée : "+String(prompt||"").slice(0,160),warnings:["Pas d’API externe utilisée."],actions:["text-local"]};
}
function applyConnectorDesignResponse(res){
  if(!res.page)return;
  apply(()=>{
    const p=clone(res.page);
    p.id=p.id||"api_page_"+Date.now();
    p.name=p.name||"API design";
    p.objects=Array.isArray(p.objects)?p.objects:[];
    p.objects=p.objects.map(o=>({...o,id:o.id||"obj_"+Date.now()+"_"+Math.floor(Math.random()*999),effects:normalizeStudioEffects(o.effects)}));
    state.studio.pages.push(p);
    state.studio.selectedPage=state.studio.pages.length-1;
    state.studio.selectedObjectId="";
    fitStudioZoom();
  },false);
  toast("Design API appliqué dans Studio.");
}
async function studioAiApiGenerate(){
  const prompt=studioAiPromptText();
  const res=await runConnectorRequest("design",prompt);
  if(res?.page) applyConnectorDesignResponse(res);
  else if(res?.ok && !res.page){
    studioAiGenerate();
    toast("API sans page exploitable : génération locale utilisée.");
  }
}
function bindConnectors(){
  const fields=[
    ["connectorMode","mode","value"],["connectorProvider","provider","value"],["connectorEndpoint","endpoint","value"],
    ["connectorTextModel","textModel","value"],["connectorImageModel","imageModel","value"],["connectorApiKey","apiKey","value"],
    ["connectorCustomHeader","customHeader","value"],["connectorTimeout","timeout","number"],["connectorEnabled","enabled","checked"],
    ["connectorResponseMapping","responseMapping","value"]
  ];
  fields.forEach(([id,key,type])=>{if($(id)){const event=(type==="checked"||id==="connectorProvider"||id==="connectorMode")?"change":"input";$(id).addEventListener(event,()=>apply(()=>{state.connector[key]=type==="checked"?$(id).checked:(type==="number"?Number($(id).value):$(id).value);connectorLog("config",`${key} modifié`);},false));}});
  if($("connectorSaveBtn"))$("connectorSaveBtn").onclick=()=>saveConnectorConfig();
  if($("connectorTestBtn"))$("connectorTestBtn").onclick=()=>testConnector();
  if($("connectorPrepareRequestBtn"))$("connectorPrepareRequestBtn").onclick=()=>prepareConnectorRequest();
  if($("connectorExportConfigBtn"))$("connectorExportConfigBtn").onclick=()=>exportConnectorConfig();
  if($("connectorImportConfigBtn"))$("connectorImportConfigBtn").onclick=()=>{$("connectorConfigInput").value="";$("connectorConfigInput").click();};
  if($("connectorConfigInput"))$("connectorConfigInput").onchange=e=>{importConnectorConfig(e.target.files[0]);e.target.value="";};
  if($("connectorClearLogBtn"))$("connectorClearLogBtn").onclick=()=>showConfirmModal("Vider journal ?", "Le journal de requêtes sera effacé.", () => apply(()=>{state.connector.log=[];},false));
  if($("connectorRunTextBtn"))$("connectorRunTextBtn").onclick=()=>runConnectorRequest("text",$("connectorPrompt")?.value);
  if($("connectorRunDesignBtn"))$("connectorRunDesignBtn").onclick=()=>runConnectorRequest("design",$("connectorPrompt")?.value);
  if($("connectorRunBrandBtn"))$("connectorRunBrandBtn").onclick=()=>runConnectorRequest("brand",$("connectorPrompt")?.value);
  if($("connectorRunDocBtn"))$("connectorRunDocBtn").onclick=()=>runConnectorRequest("document",$("connectorPrompt")?.value);
  if($("studioAiApiGenerateBtn"))$("studioAiApiGenerateBtn").onclick=()=>studioAiApiGenerate();
}


function allEcoApis(){
  return [...(ecosystemSeed.apiCatalog||[]),...(state.ecosystem.apiRegistry||[])];
}
function allEcoApps(){
  return [...(ecosystemSeed.apps||[]),...(state.ecosystem.apps||[])];
}
function ecoLog(kind,message,extra={}){
  state.ecosystem.log.unshift({id:"eco_log_"+Date.now(),kind,message,extra,at:new Date().toISOString()});
  state.ecosystem.log=state.ecosystem.log.slice(0,100);
}
function renderEcosystem(){
  if(!$("ecoApiList"))return;
  populateEcoFilters();
  syncEcoControls();
  renderEcoApis();
  renderEcoDrives();
  renderEcoApps();
  renderEcoOffline();
  renderEcoQueue();
  renderEcoLog();
  renderEcoDetails();
  renderEcoSecurity();
  renderEcoResizeReport();
  applyEcoDisplay(false);
}
function populateEcoFilters(){
  const sel=$("ecoApiCategory");
  if(sel && sel.options.length<=1){
    sel.innerHTML=`<option value="all">Toutes catégories</option>`+(ecosystemSeed.apiCategories||[]).map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("");
  }
}
function syncEcoControls(){
  const d=state.ecosystem.display;
  if($("ecoDensity"))$("ecoDensity").value=d.density||"comfortable";
  if($("ecoPanelWidth"))$("ecoPanelWidth").value=d.panelWidth||240;
  if($("ecoPanelWidthLabel"))$("ecoPanelWidthLabel").textContent=d.panelWidth||240;
  if($("ecoStudioFit"))$("ecoStudioFit").value=d.studioFit||"fit";
  if($("ecoFullscreenToggle"))$("ecoFullscreenToggle").checked=!!document.fullscreenElement;
}
function selectEco(type,id){
  apply(()=>{state.ecosystem.selectedType=type;state.ecosystem.selectedId=id;ecoLog("selection",`${type}:${id}`);},false);
}
function selectedEcoItem(){
  if(state.ecosystem.selectedType==="api")return allEcoApis().find(a=>a.id===state.ecosystem.selectedId);
  if(state.ecosystem.selectedType==="app")return allEcoApps().find(a=>a.id===state.ecosystem.selectedId);
  if(state.ecosystem.selectedType==="drive")return state.ecosystem.drives.find(d=>d.id===state.ecosystem.selectedId);
  return null;
}
function renderEcoApis(){
  const q=($("ecoApiSearch")?.value||"").toLowerCase();
  const cat=$("ecoApiCategory")?.value||"all";
  const list=allEcoApis().filter(a=>{
    const text=((a.name||"")+" "+(a.category||"")+" "+(a.usage||"")+" "+(a.notes||"")+" "+(a.endpoint||"")).toLowerCase();
    return (!q||text.includes(q))&&(cat==="all"||a.category===cat);
  });
  $("ecoApiList").innerHTML=list.map(a=>`<div class="eco-item ${state.ecosystem.selectedId===a.id?"active":""} ${state.ecosystem.pinned.includes("api:"+a.id)?"pinned":""}" data-eco-api="${esc(a.id)}">
    <strong>${esc(a.name)}</strong><span>${esc(a.category)} · ${esc(a.auth||"")}</span><p>${esc(a.notes||"")}</p>
    <span class="eco-badge">${esc(a.free||"")}</span><span class="eco-badge">${esc(a.offline||"")}</span>
  </div>`).join("") || `<div class="eco-item"><strong>Aucune API</strong><span>Ajoute une fiche API.</span></div>`;
  document.querySelectorAll("[data-eco-api]").forEach(b=>b.onclick=()=>selectEco("api",b.dataset.ecoApi));
}
function renderEcoDrives(){
  if(!$("ecoDriveList"))return;
  $("ecoDriveList").innerHTML=state.ecosystem.drives.length?state.ecosystem.drives.map(d=>`<div class="eco-item ${state.ecosystem.selectedId===d.id?"active":""}" data-eco-drive="${esc(d.id)}">
    <strong>${esc(d.name)}</strong><span>${esc(d.provider)} · ${esc(d.driveId||"")}</span>
    <p>${d.offline?"Index offline actif":"Index offline désactivé"} · ${d.cacheFiles?"cache fichiers":"metadata uniquement"}</p>
  </div>`).join(""):`<div class="eco-item"><strong>Aucun Drive</strong><span>Ajoute un Drive d’équipe ou un dossier local.</span></div>`;
  document.querySelectorAll("[data-eco-drive]").forEach(b=>b.onclick=()=>selectEco("drive",b.dataset.ecoDrive));
}
function renderEcoApps(){
  const q=($("ecoAppSearch")?.value||"").toLowerCase();
  const list=allEcoApps().filter(a=>!q||((a.name||"")+" "+(a.category||"")+" "+(a.notes||"")).toLowerCase().includes(q));
  $("ecoAppList").innerHTML=list.map(a=>`<div class="eco-item ${state.ecosystem.selectedId===a.id?"active":""} ${state.ecosystem.pinned.includes("app:"+a.id)?"pinned":""}" data-eco-app="${esc(a.id)}">
    <strong>${esc(a.name)}</strong><span>${esc(a.category)} · ${esc(a.mode)}</span><p>${esc(a.notes||"")}</p>
  </div>`).join("") || `<div class="eco-item"><strong>Aucune application</strong><span>Ajoute une application.</span></div>`;
  document.querySelectorAll("[data-eco-app]").forEach(b=>b.onclick=()=>selectEco("app",b.dataset.ecoApp));
}
function renderEcoOffline(){
  if($("ecoDbStatus"))$("ecoDbStatus").innerHTML=state.ecosystem.dbReady?`<span class="ok">IndexedDB prête.</span>`:`<span class="warn">IndexedDB non initialisée.</span>`;
  if($("ecoOfflineStores"))$("ecoOfflineStores").innerHTML=(ecosystemSeed.offlineStores||[]).map(s=>`<div class="eco-item"><strong>${esc(s)}</strong><span>store offline-first</span></div>`).join("");
}
function renderEcoQueue(){
  if(!$("ecoSyncQueue"))return;
  $("ecoSyncQueue").innerHTML=state.ecosystem.syncQueue.length?state.ecosystem.syncQueue.map(q=>`<div class="eco-item">
    <strong>${esc(q.type)}</strong><span>${new Date(q.at).toLocaleString("fr-FR")} · ${esc(q.status||"queued")}</span><p>${esc(q.label||"")}</p>
  </div>`).join(""):`<div class="eco-item"><strong>File vide</strong><span>Rien à synchroniser. C’est presque reposant.</span></div>`;
}
function renderEcoLog(){
  if(!$("ecoLog"))return;
  $("ecoLog").innerHTML=state.ecosystem.log.length?state.ecosystem.log.map(l=>`<div class="eco-item">
    <strong>${esc(l.kind)}</strong><span>${new Date(l.at).toLocaleString("fr-FR")}</span><p>${esc(l.message)}</p>
  </div>`).join(""):`<div class="eco-item"><strong>Aucun log</strong><span>Le calme avant les intégrations.</span></div>`;
}
function renderEcoDetails(){
  if(!$("ecoDetails"))return;
  const item=selectedEcoItem();
  if(!item){$("ecoDetails").innerHTML="Aucune sélection.";return;}
  $("ecoDetails").innerHTML=`<div><strong>${esc(item.name||item.id)}</strong></div>
    <div>${esc(item.category||item.provider||"")}</div>
    <div>${esc(item.notes||item.endpoint||item.driveId||"")}</div>
    <br><div>${Object.entries(item).filter(([k])=>!["name","notes"].includes(k)).map(([k,v])=>`<span class="eco-badge">${esc(k)}: ${esc(String(v).slice(0,80))}</span>`).join(" ")}</div>`;
  if($("ecoWorkspace"))$("ecoWorkspace").innerHTML=`<div><strong>${esc(item.name||item.id)}</strong></div><pre style="white-space:pre-wrap;font-size:11px">${esc(JSON.stringify(item,null,2))}</pre>`;
}
function renderEcoSecurity(){
  if(!$("ecoSecurity"))return;
  const lines=[];
  lines.push(`<div class="ok">• Base locale : IndexedDB pour snapshots, registry et file de sync.</div>`);
  lines.push(`<div class="warn">• Les API externes nécessitent réseau et souvent auth/quota.</div>`);
  lines.push(`<div class="warn">• Les apps externes peuvent bloquer l’intégration iframe.</div>`);
  lines.push(`<div class="ok">• Mode recommandé : proxy/SSO pour Drive et API sensibles.</div>`);
  $("ecoSecurity").innerHTML=lines.join("");
}
function renderEcoResizeReport(){
  if(!$("ecoResizeReport"))return;
  $("ecoResizeReport").innerHTML=`<div>Viewport : ${window.innerWidth}×${window.innerHeight}</div>
    <div>Panneaux : ${state.ecosystem.display.panelWidth}px</div>
    <div>Densité : ${esc(state.ecosystem.display.density)}</div>
    <div>Studio fit : ${esc(state.ecosystem.display.studioFit)}</div>`;
}
function addEcoApi(){
  const name=prompt("Nom de l’API gratuite / interne :","Nouvelle API");
  if(!name)return;
  const endpoint=prompt("Endpoint / URL documentation :","https://");
  apply(()=>{state.ecosystem.apiRegistry.unshift({id:"api_"+Date.now(),name,category:"text",auth:"à définir",free:"à vérifier",offline:"catalogue offline",endpoint:endpoint||"",notes:"Ajout manuel"});ecoLog("api","API ajoutée : "+name);},false);
}
function addEcoDrive(){
  const id="drive_"+Date.now();
  const drive={id,provider:$("ecoDriveProvider")?.value||"google-drive",driveId:$("ecoDriveId")?.value||"",name:$("ecoDriveName")?.value||"Drive d’équipe",offline:!!$("ecoDriveOffline")?.checked,cacheFiles:!!$("ecoDriveCacheFiles")?.checked,createdAt:new Date().toISOString()};
  apply(()=>{state.ecosystem.drives.unshift(drive);state.ecosystem.selectedType="drive";state.ecosystem.selectedId=id;ecoLog("drive","Drive ajouté : "+drive.name);},false);
}
function addEcoApp(){
  const name=prompt("Nom application :","Nouvelle application");
  if(!name)return;
  const url=prompt("URL :","https://");
  const mode=prompt("Mode : panel ou newtab","newtab") || "newtab";
  apply(()=>{state.ecosystem.apps.unshift({id:"app_"+Date.now(),name,category:"Personnalisée",url,mode,notes:"Ajout manuel"});ecoLog("app","Application ajoutée : "+name);},false);
}
function prepareEcoDriveRequest(){
  const d=selectedEcoItem();
  const req={version:"32.0",provider:"google-drive",purpose:"shared-drive-list",params:{supportsAllDrives:true,includeItemsFromAllDrives:true,corpora:d?.driveId?"drive":"user",driveId:d?.driveId||"",fields:"files(id,name,mimeType,modifiedTime,webViewLink)"}};
  download("requete-drive-equipe-v32.json",JSON.stringify(req,null,2),"application/json");
  apply(()=>{ecoLog("drive","Requête Drive préparée.");},false);
}
function openSelectedEco(){
  const item=selectedEcoItem();
  if(!item)return toast("Aucune sélection.");
  if(state.ecosystem.selectedType==="app"){
    if(item.mode==="panel" && $("ecoAppFrame")){
      $("ecoAppFrame").src=item.url;
      ecoLog("app","Ouverture panneau : "+item.name);
    }else{
      window.open(item.url,"_blank");
      ecoLog("app","Ouverture nouvel onglet : "+item.name);
    }
  }else if(item.endpoint){
    if($("ecoWorkspace"))$("ecoWorkspace").innerHTML=`<div><strong>${esc(item.name)}</strong></div><p>Endpoint :</p><pre>${esc(item.endpoint)}</pre><p>Prépare une requête via Connecteurs si besoin.</p>`;
  }else{
    renderEcoDetails();
  }
}
function pinSelectedEco(){
  if(!state.ecosystem.selectedType||!state.ecosystem.selectedId)return;
  const key=state.ecosystem.selectedType+":"+state.ecosystem.selectedId;
  apply(()=>{if(state.ecosystem.pinned.includes(key))state.ecosystem.pinned=state.ecosystem.pinned.filter(x=>x!==key);else state.ecosystem.pinned.push(key);ecoLog("pin",key);},false);
}
function queueSelectedEco(){
  const item=selectedEcoItem();
  if(!item)return toast("Aucune sélection.");
  apply(()=>{state.ecosystem.syncQueue.unshift({id:"sync_"+Date.now(),type:state.ecosystem.selectedType,label:item.name||item.id,item,at:new Date().toISOString(),status:"queued"});ecoLog("sync","Ajout file : "+(item.name||item.id));},false);
}
function runEcoSync(){
  apply(()=>{state.ecosystem.syncQueue=state.ecosystem.syncQueue.map(q=>({...q,status:"synced",syncedAt:new Date().toISOString()}));ecoLog("sync","File de synchronisation marquée comme synchronisée.");},false);
}
function exportEcoReport(){
  const report={version:"32.0",generatedAt:new Date().toISOString(),ecosystem:state.ecosystem,seed:{apiCategories:ecosystemSeed.apiCategories,offlineStores:ecosystemSeed.offlineStores,driveSupport:ecosystemSeed.driveSupport}};
  download("rapport-ecosysteme-v32.json",JSON.stringify(report,null,2),"application/json");
}
async function openEcoDb(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open("SignatureStudioOfflineV32",1);
    req.onupgradeneeded=e=>{
      const db=e.target.result;
      (ecosystemSeed.offlineStores||["projects","assets","apiRegistry","apps","syncQueue","settings","logs"]).forEach(store=>{if(!db.objectStoreNames.contains(store))db.createObjectStore(store,{keyPath:"id"});});
    };
    req.onsuccess=e=>{ecoDb=e.target.result;state.ecosystem.dbReady=true;resolve(ecoDb);};
    req.onerror=()=>reject(req.error);
  });
}
async function ecoDbPut(store,obj){
  if(!ecoDb)await openEcoDb();
  return new Promise((resolve,reject)=>{
    const tx=ecoDb.transaction(store,"readwrite");
    tx.objectStore(store).put(obj);
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error);
  });
}
async function ecoDbGet(store,id){
  if(!ecoDb)await openEcoDb();
  return new Promise((resolve,reject)=>{
    const tx=ecoDb.transaction(store,"readonly");
    const req=tx.objectStore(store).get(id);
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}
async function initEcoDb(){
  try{await openEcoDb();await ecoDbPut("settings",{id:"lastInit",at:new Date().toISOString()});apply(()=>{state.ecosystem.dbReady=true;ecoLog("db","IndexedDB initialisée.");},false);toast("Base hors ligne prête.");}
  catch(e){toast("Erreur IndexedDB : "+e.message);}
}
async function saveEcoSnapshot(){
  const snap={id:"latest",version:"32.0",at:new Date().toISOString(),state:clone(state)};
  await ecoDbPut("projects",snap);
  apply(()=>{ecoLog("db","Snapshot sauvegardé.");},false);
  toast("Snapshot offline sauvegardé.");
}
async function loadEcoSnapshot(){
  const snap=await ecoDbGet("projects","latest");
  if(!snap)return toast("Aucun snapshot.");
  state={...clone(DEFAULT_STATE),...snap.state};
  normalize();renderAll();toast("Snapshot restauré.");
}
function exportEcoBackup(){
  const backup={version:"32.0",exportedAt:new Date().toISOString(),state:state,ecosystemSeed};
  download("backup-offline-signature-studio-v32.json",JSON.stringify(backup,null,2),"application/json");
}
function importEcoBackup(file){
  if(!file)return;
  const r=new FileReader();
  r.onload=()=>{try{const data=JSON.parse(r.result);state={...clone(DEFAULT_STATE),...(data.state||data)};normalize();renderAll();toast("Backup restauré.");}catch(e){toast("Backup invalide.");}};
  r.readAsText(file);
}
function exportEcoApis(){download("api-gratuites-registre-v32.json",JSON.stringify({version:"32.0",apis:state.ecosystem.apiRegistry,seed:ecosystemSeed.apiCatalog},null,2),"application/json");}
function importEcoApis(file){
  if(!file)return;
  const r=new FileReader();
  r.onload=()=>{try{const data=JSON.parse(r.result);apply(()=>{state.ecosystem.apiRegistry.unshift(...(data.apis||data.apiRegistry||[]));ecoLog("api","Import API JSON.");},false);}catch(e){toast("JSON API invalide.");}};
  r.readAsText(file);
}
function exportEcoApps(){download("applications-communication-v32.json",JSON.stringify({version:"32.0",apps:state.ecosystem.apps,seed:ecosystemSeed.apps},null,2),"application/json");}
function exportDriveIndex(){download("index-drives-equipe-v32.json",JSON.stringify({version:"32.0",drives:state.ecosystem.drives,queue:state.ecosystem.syncQueue},null,2),"application/json");}
async function toggleFullscreen(force=null){
  try{
    const want=force===null?!document.fullscreenElement:force;
    if(want && !document.fullscreenElement){await document.documentElement.requestFullscreen();}
    if(!want && document.fullscreenElement){await document.exitFullscreen();}
    apply(()=>{state.ecosystem.display.fullscreen=!!document.fullscreenElement;},false);
  }catch(e){toast("Plein écran refusé par le navigateur.");}
}
function applyEcoDisplay(save=true){
  const d=state.ecosystem.display;
  document.body.classList.remove("eco-density-compact","eco-density-dense","eco-density-comfortable");
  document.body.classList.add("eco-density-"+(d.density||"comfortable"));
  document.documentElement.style.setProperty("--eco-panel-width",(d.panelWidth||240)+"px");
  document.body.classList.toggle("eco-fullscreen",!!document.fullscreenElement);
  if(save)autoSave();
  fitPreview();
  if(d.studioFit==="fit")fitStudioZoom();
  if(d.studioFit==="real")state.studio.zoom=1;
  if(d.studioFit==="wide")state.studio.zoom=.8;
  renderEcoResizeReport();
}
function resetEcoDisplay(){
  apply(()=>{state.ecosystem.display={fullscreen:false,density:"comfortable",panelWidth:240,studioFit:"fit"};applyEcoDisplay(false);},false);
}
function bindEcosystem(){
  document.querySelectorAll(".eco-tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".eco-tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".eco-panel").forEach(x=>x.classList.remove("active"));b.classList.add("active");$(b.dataset.ecoPanel)?.classList.add("active");});
  if($("ecoApiSearch"))$("ecoApiSearch").oninput=renderEcoApis;
  if($("ecoApiCategory"))$("ecoApiCategory").onchange=renderEcoApis;
  if($("ecoAddApiBtn"))$("ecoAddApiBtn").onclick=()=>addEcoApi();
  if($("ecoExportApisBtn"))$("ecoExportApisBtn").onclick=()=>exportEcoApis();
  if($("ecoImportApisBtn"))$("ecoImportApisBtn").onclick=()=>{$("ecoImportApisInput").value="";$("ecoImportApisInput").click();};
  if($("ecoImportApisInput"))$("ecoImportApisInput").onchange=e=>{importEcoApis(e.target.files[0]);e.target.value="";};
  if($("ecoAddDriveBtn"))$("ecoAddDriveBtn").onclick=()=>addEcoDrive();
  if($("ecoPrepareDriveBtn"))$("ecoPrepareDriveBtn").onclick=()=>prepareEcoDriveRequest();
  if($("ecoExportDriveIndexBtn"))$("ecoExportDriveIndexBtn").onclick=()=>exportDriveIndex();
  if($("ecoAppSearch"))$("ecoAppSearch").oninput=renderEcoApps;
  if($("ecoAddAppBtn"))$("ecoAddAppBtn").onclick=()=>addEcoApp();
  if($("ecoExportAppsBtn"))$("ecoExportAppsBtn").onclick=()=>exportEcoApps();
  if($("ecoInitDbBtn"))$("ecoInitDbBtn").onclick=()=>initEcoDb();
  if($("ecoSaveSnapshotBtn"))$("ecoSaveSnapshotBtn").onclick=()=>saveEcoSnapshot();
  if($("ecoLoadSnapshotBtn"))$("ecoLoadSnapshotBtn").onclick=()=>loadEcoSnapshot();
  if($("ecoExportBackupBtn"))$("ecoExportBackupBtn").onclick=()=>exportEcoBackup();
  if($("ecoImportBackupBtn"))$("ecoImportBackupBtn").onclick=()=>{$("ecoImportBackupInput").value="";$("ecoImportBackupInput").click();};
  if($("ecoImportBackupInput"))$("ecoImportBackupInput").onchange=e=>{importEcoBackup(e.target.files[0]);e.target.value="";};
  if($("ecoOpenSelectedBtn"))$("ecoOpenSelectedBtn").onclick=()=>openSelectedEco();
  if($("ecoPinSelectedBtn"))$("ecoPinSelectedBtn").onclick=()=>pinSelectedEco();
  if($("ecoQueueSyncBtn"))$("ecoQueueSyncBtn").onclick=()=>queueSelectedEco();
  if($("ecoRunSyncBtn"))$("ecoRunSyncBtn").onclick=()=>runEcoSync();
  if($("ecoExportReportBtn"))$("ecoExportReportBtn").onclick=()=>exportEcoReport();
  if($("ecoFullscreenToggle"))$("ecoFullscreenToggle").onchange=()=>toggleFullscreen($("ecoFullscreenToggle").checked);
  if($("fullscreenBtn"))$("fullscreenBtn").onclick=()=>toggleFullscreen();
  if($("ecoDensity"))$("ecoDensity").onchange=()=>apply(()=>{state.ecosystem.display.density=$("ecoDensity").value;applyEcoDisplay(false);},false);
  if($("ecoPanelWidth"))$("ecoPanelWidth").oninput=()=>apply(()=>{state.ecosystem.display.panelWidth=Number($("ecoPanelWidth").value);applyEcoDisplay(false);},false);
  if($("ecoStudioFit"))$("ecoStudioFit").onchange=()=>apply(()=>{state.ecosystem.display.studioFit=$("ecoStudioFit").value;applyEcoDisplay(false);},false);
  if($("ecoApplyDisplayBtn"))$("ecoApplyDisplayBtn").onclick=()=>applyEcoDisplay(true);
  if($("ecoResetDisplayBtn"))$("ecoResetDisplayBtn").onclick=()=>resetEcoDisplay();
  document.addEventListener("fullscreenchange",()=>{state.ecosystem.display.fullscreen=!!document.fullscreenElement;renderEcosystem();});
}


function backendLog(kind,message,extra={}){
  state.backend.log.unshift({id:"backend_log_"+Date.now(),kind,message,extra,at:new Date().toISOString()});
  state.backend.log=state.backend.log.slice(0,120);
}
function renderBackend(){
  if(!$("backendBaseUrl"))return;
  syncBackendControls();
  renderBackendArchitecture();
  renderBackendModules();
  renderBackendSecurity();
  renderBackendEnv();
  renderBackendRoutes();
  renderBackendLog();
  renderBackendHealth();
}
function syncBackendControls(){
  const b=state.backend;
  const map=[
    ["backendBaseUrl","baseUrl","value"],["backendEnvironment","environment","value"],["backendEnabled","enabled","checked"],["backendOfflineFallback","offlineFallback","checked"],
    ["backendAuthMode","authMode","value"],["backendAuthIssuer","authIssuer","value"],["backendAuthClientId","authClientId","value"],["backendRoleSync","roleSync","checked"],
    ["backendDbType","dbType","value"],["backendStorageType","storageType","value"],["backendStoragePath","storagePath","value"],
    ["backendProxyAi","proxy.ai","checked"],["backendProxyDrive","proxy.drive","checked"],["backendProxySharePoint","proxy.sharepoint","checked"],["backendProxyLogs","proxy.logs","checked"],
    ["backendDeployTarget","deployTarget","value"]
  ];
  map.forEach(([id,key,type])=>{
    if(!$(id))return;
    const val=key.includes(".")?key.split(".").reduce((o,k)=>o?.[k],b):b[key];
    if(type==="checked")$(id).checked=!!val; else $(id).value=val??"";
  });
}
function renderBackendArchitecture(){
  if(!$("backendArchitecture"))return;
  const a=backendSeed.architecture||{};
  $("backendArchitecture").innerHTML=Object.entries(a).map(([k,v])=>`<div><span class="backend-badge">${esc(k)}</span> ${esc(v)}</div>`).join("");
}
function renderBackendModules(){
  if(!$("backendModules"))return;
  $("backendModules").innerHTML=(backendSeed.modules||[]).map(m=>`<div class="backend-item">
    <strong>${esc(m.name)}</strong><span>${esc(m.status)} · ${esc(m.id)}</span>
    <div>${(m.routes||[]).map(r=>`<span class="backend-badge">${esc(r)}</span>`).join("")}</div>
  </div>`).join("");
}
function renderBackendSecurity(){
  if(!$("backendSecurity"))return;
  const lines=(backendSeed.security||[]).map(s=>`<div class="warn">• ${esc(s)}</div>`);
  lines.unshift(`<div class="${state.backend.enabled?"ok":"warn"}">• Backend ${state.backend.enabled?"activé":"désactivé"}.</div>`);
  lines.push(`<br><div>Mode recommandé : HTTPS + SSO + proxy API. Oui, c’est moins fun qu’un bouton magique, mais nettement moins catastrophique.</div>`);
  $("backendSecurity").innerHTML=lines.join("");
}
function renderBackendEnv(){
  if(!$("backendEnvList"))return;
  $("backendEnvList").innerHTML=(backendSeed.env||[]).map(e=>`<div class="backend-item"><strong>${esc(e)}</strong><span>variable environnement</span></div>`).join("");
}
function renderBackendRoutes(){
  if(!$("backendRoutes"))return;
  const routes=(backendSeed.modules||[]).flatMap(m=>(m.routes||[]).map(r=>({module:m.name,route:r})));
  $("backendRoutes").innerHTML=routes.map(r=>`<div class="backend-item"><strong>${esc(r.route)}</strong><span>${esc(r.module)}</span></div>`).join("");
}
function renderBackendLog(){
  if(!$("backendLog"))return;
  $("backendLog").innerHTML=state.backend.log.length?state.backend.log.map(l=>`<div class="backend-item">
    <strong>${esc(l.kind)}</strong><span>${new Date(l.at).toLocaleString("fr-FR")}</span><p>${esc(l.message)}</p>
  </div>`).join(""):`<div class="backend-item"><strong>Aucun log</strong><span>Le serveur n’a pas encore eu l’occasion de se plaindre.</span></div>`;
}
function renderBackendHealth(){
  if(!$("backendHealthReport"))return;
  const h=state.backend.health;
  if(!h){$("backendHealthReport").innerHTML="Aucun test effectué.";return;}
  $("backendHealthReport").innerHTML=`<div class="${h.ok?"ok":"ko"}">${h.ok?"Serveur OK":"Serveur inaccessible"}</div>
    <pre style="white-space:pre-wrap;font-size:11px">${esc(JSON.stringify(h,null,2))}</pre>`;
}
function backendUrl(path=""){
  return String(state.backend.baseUrl||"").replace(/\/$/,"")+path;
}
async function backendFetch(path,options={}){
  const url=backendUrl(path);
  const res=await fetch(url,{headers:{"Content-Type":"application/json",...(options.headers||{})},...options});
  const text=await res.text();
  let data;
  try{data=JSON.parse(text);}catch(e){data={raw:text};}
  if(!res.ok)throw new Error(data.error||`HTTP ${res.status}`);
  return data;
}
async function testBackendHealth(){
  if(!state.backend.enabled && state.backend.offlineFallback){
    apply(()=>{state.backend.health={ok:false,offline:true,message:"Backend désactivé, fallback offline actif.",time:new Date().toISOString()};backendLog("health","Backend désactivé : fallback offline.");},false);
    return;
  }
  try{
    const data=await backendFetch("/api/health");
    apply(()=>{state.backend.health={ok:true,...data};backendLog("health","Serveur OK.");},false);
  }catch(e){
    apply(()=>{state.backend.health={ok:false,error:String(e.message||e),time:new Date().toISOString()};backendLog("health","Erreur health : "+String(e.message||e));},false);
  }
}
async function backendMe(){
  try{
    const data=await backendFetch("/api/auth/me");
    apply(()=>{state.backend.currentUser=data;backendLog("auth","Utilisateur lu : "+(data.email||data.name||data.id));},false);
    toast("Utilisateur backend lu.");
  }catch(e){toast("Erreur auth : "+e.message);}
}
async function backendLogin(){
  try{
    const data=await backendFetch("/api/auth/login",{method:"POST",body:JSON.stringify({mode:state.backend.authMode})});
    apply(()=>{backendLog("auth","Login test : "+JSON.stringify(data).slice(0,120));},false);
    toast("Login test envoyé.");
  }catch(e){toast("Erreur login : "+e.message);}
}
async function syncBackendProject(){
  const project={id:"project_latest",name:"Signature Studio Project",studio:state.studio,collaboration:state.collaboration,updatedAt:new Date().toISOString()};
  if(!state.backend.enabled){
    queueSelectedEco();
    backendLog("sync","Backend désactivé : projet gardé en offline/local.");
    toast("Backend désactivé : sync locale uniquement.");
    renderBackend();
    return;
  }
  try{
    const data=await backendFetch("/api/projects",{method:"POST",body:JSON.stringify(project)});
    apply(()=>{backendLog("sync","Projet synchronisé : "+data.id);},false);
    toast("Projet synchronisé.");
  }catch(e){toast("Erreur sync projet : "+e.message);}
}
async function pullBackendLibrary(){
  if(!state.backend.enabled)return toast("Backend désactivé.");
  try{
    const data=await backendFetch("/api/library/assets");
    apply(()=>{backendLog("library","Assets reçus : "+(Array.isArray(data)?data.length:0));},false);
    toast("Bibliothèque récupérée.");
  }catch(e){toast("Erreur bibliothèque : "+e.message);}
}
async function pushBackendLibrary(){
  if(!state.backend.enabled)return toast("Backend désactivé.");
  const asset={id:"library_snapshot_"+Date.now(),name:"Snapshot bibliothèque",assets:state.assets,studioLibrary:state.studio.library,createdAt:new Date().toISOString()};
  try{
    await backendFetch("/api/library/assets",{method:"POST",body:JSON.stringify(asset)});
    apply(()=>{backendLog("library","Bibliothèque envoyée.");},false);
    toast("Bibliothèque envoyée.");
  }catch(e){toast("Erreur push bibliothèque : "+e.message);}
}
async function sendBackendLog(){
  const entry={kind:"client-log",message:"Log depuis Signature Studio",stateVersion:"34.0",at:new Date().toISOString()};
  if(!state.backend.enabled){backendLog("log","Backend désactivé : log local.");renderBackend();return;}
  try{
    await backendFetch("/api/logs",{method:"POST",body:JSON.stringify(entry)});
    apply(()=>{backendLog("log","Log envoyé au serveur.");},false);
  }catch(e){toast("Erreur log serveur : "+e.message);}
}
function saveBackendConfig(){
  apply(()=>{backendLog("config","Configuration backend sauvegardée.");},false);
  toast("Configuration backend sauvegardée.");
}
function exportBackendConfig(){
  const config={version:"34.0",backend:state.backend,seed:backendSeed};
  download("configuration-backend-v34.json",JSON.stringify(config,null,2),"application/json");
}
function prepareBackendStorage(){
  const schema={
    version:"34.0",
    dbType:state.backend.dbType,
    storageType:state.backend.storageType,
    storagePath:state.backend.storagePath,
    tables:["users","projects","assets","libraries","comments","versions","exports","audit_logs","api_usage"],
    notes:"Schéma logique. À convertir en migration SQL selon DB choisie."
  };
  download("schema-stockage-backend-v34.json",JSON.stringify(schema,null,2),"application/json");
  backendLog("storage","Schéma stockage préparé.");
}
function prepareBackendProxy(){
  const routes={
    version:"34.0",
    proxy:state.backend.proxy,
    routes:["/api/proxy/ai/generate","/api/proxy/ai/analyze","/api/proxy/drive/list","/api/proxy/sharepoint/files"],
    security:"Les clés API restent côté serveur."
  };
  download("routes-proxy-backend-v34.json",JSON.stringify(routes,null,2),"application/json");
  backendLog("proxy","Routes proxy préparées.");
}
function syncBackendConnectors(){
  apply(()=>{
    state.connector.enabled=true;
    state.connector.mode="proxy";
    state.connector.endpoint=backendUrl("/api/proxy/ai/generate");
    state.connector.provider="custom-rest";
    backendLog("connectors","Connecteur IA branché sur backend proxy.");
  },false);
  toast("Connecteurs branchés sur backend.");
}
function exportDeployGuide(){
  const target=(backendSeed.deploymentTargets||[]).find(t=>t.id===state.backend.deployTarget)||{};
  const guide=`# Guide déploiement Signature Studio v34

## Cible
${target.name||state.backend.deployTarget}

## Commandes de base

\`\`\`bash
cd server
cp .env.example .env
npm install
npm run dev
\`\`\`

## Production recommandée
- HTTPS obligatoire
- Reverse proxy IIS/Nginx/Apache
- SSO/OIDC/SAML
- Base PostgreSQL ou SQL Server
- Stockage partagé sécurisé
- Logs serveur
- Sauvegardes

## Endpoint PWA
${state.backend.baseUrl}

## Notes
${target.notes||target.command||""}
`;
  download("guide-deploiement-v34.md",guide,"text/markdown");
}
function exportBackendReport(){
  const report={version:"34.0",generatedAt:new Date().toISOString(),backend:state.backend,seed:backendSeed,health:state.backend.health};
  download("rapport-backend-v34.json",JSON.stringify(report,null,2),"application/json");
}
function exportBackendBundle(){
  const manifest={version:"34.0",included:["server/package.json","server/src/server.js","server/src/routes/*.js",".env.example","Dockerfile","docker-compose.yml"],note:"Le ZIP principal contient déjà le dossier server complet."};
  download("manifest-backend-bundle-v34.json",JSON.stringify(manifest,null,2),"application/json");
}

function businessConnectorLog(kind,message,extra={}){
  state.businessConnectors.log.unshift({id:"business_connector_"+Date.now(),kind,message,extra,at:new Date().toISOString()});
  state.businessConnectors.log=state.businessConnectors.log.slice(0,120);
}
function selectedBusinessConnector(){
  return (businessConnectorsSeed.connectors||[]).find(c=>c.id===state.businessConnectors.selectedId) || (businessConnectorsSeed.connectors||[])[0] || null;
}
function renderBusinessConnectors(){
  if(!$('businessConnectorCatalog'))return;
  const list=businessConnectorsSeed.connectors||[];
  if(!state.businessConnectors.selectedId && list[0])state.businessConnectors.selectedId=list[0].id;
  $('businessConnectorCatalog').innerHTML=list.map(c=>`<div class="v34-connector-item ${c.id===state.businessConnectors.selectedId?'active':''}" data-business-connector="${esc(c.id)}">
    <strong>${esc(c.name)}</strong>
    <span>${esc(c.family)} · priorité ${esc(c.priority)} · ${esc(c.status)}</span>
  </div>`).join('') || `<div class="v34-connector-item"><strong>Aucun connecteur</strong><span>Le fichier business-connectors-v34.json n’est pas chargé.</span></div>`;
  document.querySelectorAll('[data-business-connector]').forEach(b=>b.onclick=()=>apply(()=>{state.businessConnectors.selectedId=b.dataset.businessConnector;},false));
  renderBusinessConnectorDetail();
  renderBusinessConnectorWorkflows();
  renderBusinessConnectorSecurity();
  renderBusinessConnectorEnv();
  renderBusinessConnectorLog();
  renderBusinessConnectorQueue();
}
function renderBusinessConnectorDetail(){
  const c=selectedBusinessConnector();
  if(!$('businessConnectorDetail'))return;
  if(!c){$('businessConnectorDetail').innerHTML='Aucun connecteur sélectionné.';return;}
  $('businessConnectorDetail').innerHTML=`
    <div><span class="v34-badge high">${esc(c.priority)}</span><span class="v34-badge warn">${esc(c.status)}</span><span class="v34-badge">${esc(c.family)}</span></div>
    <p><strong>Usage métier :</strong><br>${esc(c.businessUse)}</p>
    <p><strong>Routes backend :</strong><br>${(c.routes||[]).map(r=>`<span class="v34-badge">${esc(r)}</span>`).join('')}</p>
    <p><strong>Fallback offline :</strong><br>${esc(c.offlineFallback)}</p>
    <p><strong>Risques :</strong><br>${(c.risks||[]).map(r=>`<span class="v34-badge ko">${esc(r)}</span>`).join('')}</p>`;
}
function renderBusinessConnectorWorkflows(){
  if(!$('businessConnectorWorkflows'))return;
  $('businessConnectorWorkflows').innerHTML=(businessConnectorsSeed.workflows||[]).map(w=>`<div class="v34-connector-item"><strong>${esc(w.name)}</strong><span>${(w.steps||[]).map((s,i)=>`${i+1}. ${esc(s)}`).join(' → ')}</span></div>`).join('');
}
function renderBusinessConnectorSecurity(){
  if(!$('businessConnectorSecurity'))return;
  const extra=state.backend.enabled?'<div class="ok">• Backend activé : proxy recommandé pour les secrets.</div>':'<div class="warn">• Backend désactivé : tests en mode simulation locale.</div>';
  $('businessConnectorSecurity').innerHTML=extra+(businessConnectorsSeed.security||[]).map(s=>`<div>• ${esc(s)}</div>`).join('');
}
function renderBusinessConnectorEnv(){
  if(!$('businessConnectorEnv'))return;
  const c=selectedBusinessConnector();
  const env=Array.from(new Set([...(c?.env||[]),...(businessConnectorsSeed.env||[]).slice(0,4)]));
  $('businessConnectorEnv').innerHTML=env.map(e=>`<div class="v34-connector-item"><strong>${esc(e)}</strong><span>Variable serveur, jamais navigateur.</span></div>`).join('');
}
function renderBusinessConnectorLog(){
  if(!$('businessConnectorLog'))return;
  $('businessConnectorLog').innerHTML=state.businessConnectors.log.length?state.businessConnectors.log.map(l=>`<div class="v34-connector-item"><strong>${esc(l.kind)}</strong><span>${esc(l.message)} · ${new Date(l.at).toLocaleString()}</span></div>`).join(''):`<div class="v34-connector-item"><strong>Aucun événement</strong><span>Le connecteur attend qu’un humain clique sur quelque chose. Terrible destin.</span></div>`;
}
function renderBusinessConnectorQueue(){
  if(!$('businessConnectorQueue'))return;
  const q=state.businessConnectors.offlineQueue||[];
  $('businessConnectorQueue').innerHTML=q.length?`<strong>${q.length} action(s) en attente</strong><br>`+q.slice(0,6).map(x=>`• ${esc(x.type)} · ${esc(x.connectorId)} · ${new Date(x.at).toLocaleTimeString()}`).join('<br>'):'Aucune action offline en attente.';
}
async function testBusinessConnector(){
  const c=selectedBusinessConnector();
  if(!c)return toast('Aucun connecteur.');
  if(!state.backend.enabled){
    apply(()=>{state.businessConnectors.lastTest={ok:false,connectorId:c.id,offline:true,at:new Date().toISOString()};businessConnectorLog('test-offline',`Simulation locale pour ${c.name}`);state.businessConnectors.offlineQueue.unshift({id:'queue_'+Date.now(),type:'connector.test',connectorId:c.id,at:new Date().toISOString()});},false);
    toast('Backend désactivé : test mis dans la file offline.');
    return;
  }
  try{
    const data=await backendFetch(`/api/connectors/test/${encodeURIComponent(c.id)}`,{method:'POST',body:JSON.stringify({connectorId:c.id})});
    apply(()=>{state.businessConnectors.lastTest=data;businessConnectorLog('test',`${c.name} : ${data.ok?'OK':'à configurer'}`);},false);
    toast('Test connecteur terminé.');
  }catch(e){toast('Erreur connecteur : '+e.message);businessConnectorLog('error',e.message);renderBusinessConnectors();}
}
async function readBackendConnectorCatalog(){
  if(!state.backend.enabled)return toast('Backend désactivé.');
  try{
    const data=await backendFetch('/api/connectors/catalog');
    apply(()=>{businessConnectorLog('catalog','Catalogue backend reçu : '+((data.connectors||[]).length));},false);
    toast('Catalogue backend lu.');
  }catch(e){toast('Erreur catalogue : '+e.message);}
}
function exportBusinessConnectorPlan(){
  const payload={version:'34.0',generatedAt:new Date().toISOString(),backend:state.backend,businessConnectors:businessConnectorsSeed,state:state.businessConnectors};
  download('plan-connecteurs-metiers-v34.json',JSON.stringify(payload,null,2),'application/json');
  businessConnectorLog('export','Plan v34 exporté.');renderBusinessConnectors();
}
function pushBusinessConnectorQueue(){
  apply(()=>{state.businessConnectors.offlineQueue.unshift({id:'queue_'+Date.now(),type:'library.sync.preview',connectorId:state.businessConnectors.selectedId,at:new Date().toISOString()});businessConnectorLog('queue','Action offline ajoutée.');},false);
  toast('Action ajoutée à la file offline.');
}
function bindBusinessConnectors(){
  if($('businessConnectorTestBtn'))$('businessConnectorTestBtn').onclick=()=>testBusinessConnector();
  if($('businessConnectorCatalogBtn'))$('businessConnectorCatalogBtn').onclick=()=>readBackendConnectorCatalog();
  if($('businessConnectorExportPlanBtn'))$('businessConnectorExportPlanBtn').onclick=()=>exportBusinessConnectorPlan();
  if($('businessConnectorPushQueueBtn'))$('businessConnectorPushQueueBtn').onclick=()=>pushBusinessConnectorQueue();
}

function bindBackend(){
  document.querySelectorAll(".backend-tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".backend-tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".backend-panel").forEach(x=>x.classList.remove("active"));b.classList.add("active");$(b.dataset.backendPanel)?.classList.add("active");});
  const fields=[
    ["backendBaseUrl","baseUrl","value"],["backendEnvironment","environment","value"],["backendEnabled","enabled","checked"],["backendOfflineFallback","offlineFallback","checked"],
    ["backendAuthMode","authMode","value"],["backendAuthIssuer","authIssuer","value"],["backendAuthClientId","authClientId","value"],["backendRoleSync","roleSync","checked"],
    ["backendDbType","dbType","value"],["backendStorageType","storageType","value"],["backendStoragePath","storagePath","value"],
    ["backendProxyAi","proxy.ai","checked"],["backendProxyDrive","proxy.drive","checked"],["backendProxySharePoint","proxy.sharepoint","checked"],["backendProxyLogs","proxy.logs","checked"],
    ["backendDeployTarget","deployTarget","value"]
  ];
  fields.forEach(([id,key,type])=>{if($(id)){const ev=type==="checked"||id.includes("Mode")||id.includes("Type")||id.includes("Target")||id.includes("Environment")?"change":"input";$(id).addEventListener(ev,()=>apply(()=>{if(key.includes(".")){const [a,b]=key.split(".");state.backend[a][b]=type==="checked"?$(id).checked:$(id).value;}else state.backend[key]=type==="checked"?$(id).checked:$(id).value;backendLog("config",key+" modifié");},false));}});
  if($("backendSaveConfigBtn"))$("backendSaveConfigBtn").onclick=()=>saveBackendConfig();
  if($("backendHealthBtn"))$("backendHealthBtn").onclick=()=>testBackendHealth();
  if($("backendExportConfigBtn"))$("backendExportConfigBtn").onclick=()=>exportBackendConfig();
  if($("backendMeBtn"))$("backendMeBtn").onclick=()=>backendMe();
  if($("backendLoginBtn"))$("backendLoginBtn").onclick=()=>backendLogin();
  if($("backendPrepareStorageBtn"))$("backendPrepareStorageBtn").onclick=()=>prepareBackendStorage();
  if($("backendExportSchemaBtn"))$("backendExportSchemaBtn").onclick=()=>prepareBackendStorage();
  if($("backendSyncConnectorsBtn"))$("backendSyncConnectorsBtn").onclick=()=>syncBackendConnectors();
  if($("backendPrepareProxyBtn"))$("backendPrepareProxyBtn").onclick=()=>prepareBackendProxy();
  if($("backendExportDeployBtn"))$("backendExportDeployBtn").onclick=()=>exportDeployGuide();
  if($("backendExportBundleBtn"))$("backendExportBundleBtn").onclick=()=>exportBackendBundle();
  if($("backendSyncProjectBtn"))$("backendSyncProjectBtn").onclick=()=>syncBackendProject();
  if($("backendPullLibraryBtn"))$("backendPullLibraryBtn").onclick=()=>pullBackendLibrary();
  if($("backendPushLibraryBtn"))$("backendPushLibraryBtn").onclick=()=>pushBackendLibrary();
  if($("backendSendLogBtn"))$("backendSendLogBtn").onclick=()=>sendBackendLog();
  if($("backendExportReportBtn"))$("backendExportReportBtn").onclick=()=>exportBackendReport();
}

function bindActionIds(ids, handler){
  ids.forEach(id=>{ const el=$(id); if(el) el.onclick=handler; });
}
function updateSimpleModeLabels(){
  ["simpleModeBtn","homeSimpleModeBtn"].forEach(id=>{ const el=$(id); if(el) el.textContent=state.ux.simpleMode?"Mode normal":"Mode simple"; });
}
function newProjectAction(){
  showConfirmModal("Nouveau projet ?", "Toutes les modifications non sauvegardees seront perdues.", () => {
    state=clone(DEFAULT_STATE);
    normalize();
    state.ux.documentDirty=false;
    state.ux.lastModifiedAt="";
    state.ux.lastModifiedLabel="Nouveau projet";
    renderAll();
    updateSimpleModeLabels();
  });
}
function saveProjectAction(){
  state.ux={...(state.ux||{}),documentDirty:false,lastModifiedAt:new Date().toISOString(),lastModifiedLabel:"Sauvegarde"};
  
  try {
    localStorage.setItem("signaturePwaV34Saved",JSON.stringify(state));
  } catch(e) {
    if (e.name === 'QuotaExceededError' || e.message.includes('quota')) {
      toast("Stockage saturé ! Le projet n'a pas pu être sauvegardé. Veuillez supprimer des assets.");
    }
  }

  window.hasUnsavedCloudChanges = true;
  if(typeof window.syncToCloud==="function") window.syncToCloud(true);
  renderSettingsDocumentProperties();
  renderHome();
  toast("Projet sauvegarde.");
}
function openProjectAction(){
  const input=$("openProjectInput");
  if(input) input.click();
}
function resetCacheAction(){
  showConfirmModal("Reinitialiser l'application ?", "Cette action supprimera toutes vos donnees locales et reinitialisera l'application.", resetAppCache);
}
function toggleSimpleModeAction(){
  apply(()=>{
    state.ux.simpleMode=!state.ux.simpleMode;
    document.body.classList.toggle("simple-mode",state.ux.simpleMode);
    updateSimpleModeLabels();
    if(state.ux.simpleMode){
      const active=document.querySelector(".view.active")?.id;
      if(["tools","ai","collaboration","connectors","ecosystem","backend","business-connectors","quality"].includes(active))showView("home");
    }
  },false);
  updateSimpleModeLabels();
}
function toggleCompactUiAction(){
  document.body.classList.toggle("compact-ui");
  toast(document.body.classList.contains("compact-ui")?"Vue compacte activee.":"Vue compacte desactivee.");
}
function exportAppStateAction(){
  download("etat-complet-signature-v34.json",JSON.stringify(state,null,2),"application/json");
}
function qualityAction(){
  showQualityReport();
}
function helpAction(){
  toast("Aide : Accueil pilote le projet, Studio cree les visuels, Bibliotheque gere les assets, Parametres suit l'etat du document, Export genere les fichiers finaux.");
}
async function installPwaAction(){
  if (deferredInstallPrompt && typeof deferredInstallPrompt.prompt === "function") {
    try {
      const choiceResult = await Promise.race([
        deferredInstallPrompt.prompt(),
        new Promise(resolve=>setTimeout(()=>resolve({outcome:"timeout"}),1800))
      ]);
      if (choiceResult && choiceResult.outcome === "accepted") {
        toast("Application installee.");
        deferredInstallPrompt = null;
      } else if(choiceResult && choiceResult.outcome === "timeout") {
        toast("Installation ouverte ou en attente dans le navigateur.");
      } else {
        toast("Installation annulee.");
      }
    } catch (err) {
      toast("Erreur installation : " + err.message);
    }
    return;
  }
  if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) toast("Application deja installee.");
  else toast("Installation disponible depuis HTTPS ou un navigateur compatible.");
}

async function exportHomeSummaryPdf(){
  const payload={name:state.name||"Signature",generatedAt:new Date().toISOString(),quality:qualityReportData(),documents:state.documents?.length||0,tags:state.tags||[],collaborators:state.collaborators?.length||0,template:state.design?.templateId||"default"};
  if(typeof PDFLib === "undefined"){
    download("synthese-projet.json",JSON.stringify(payload,null,2),"application/json");
    toast("PDF indisponible : synthese JSON exportee.");
    return;
  }
  try{
    const { PDFDocument, rgb, StandardFonts } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595,842]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let y = height - 58;
    page.drawText("Synthese projet Signature Studio",{x:42,y,size:22,font:bold,color:rgb(0.15,0.21,0.25)});
    y -= 28;
    page.drawText(new Date(payload.generatedAt).toLocaleString("fr-FR"),{x:42,y,size:10,font,color:rgb(0.39,0.45,0.52)});
    y -= 42;
    const line=(label,value)=>{ page.drawText(label,{x:42,y,size:11,font:bold,color:rgb(0.15,0.21,0.25)}); page.drawText(String(value),{x:210,y,size:11,font,color:rgb(0.15,0.21,0.25)}); y-=24; };
    line("Projet",payload.name);
    line("Score qualite",payload.quality.score+" %");
    line("Issues qualite",payload.quality.issues.length);
    line("Documents",payload.documents);
    line("Collaborateurs",payload.collaborators);
    line("Modele",payload.template);
    line("Tags",payload.tags.length?payload.tags.join(", "):"Aucun");
    y -= 12;
    page.drawLine({start:{x:42,y},end:{x:width-42,y},thickness:1,color:rgb(0.83,0.87,0.91)});
    y -= 28;
    page.drawText("Actions conseillees",{x:42,y,size:14,font:bold,color:rgb(0.15,0.21,0.25)});
    y -= 24;
    const actions=(payload.quality.issues.length?payload.quality.issues:["Aucun point bloquant detecte."]).slice(0,8);
    actions.forEach(item=>{ page.drawText("- "+String(item).slice(0,88),{x:54,y,size:10,font,color:rgb(0.28,0.33,0.39)}); y-=18; });
    const bytes=await pdfDoc.save();
    download("synthese-projet.pdf",new Blob([bytes],{type:"application/pdf"}),"application/pdf");
    toast("Synthese PDF exportee.");
  }catch(err){
    console.error(err);
    download("synthese-projet.json",JSON.stringify(payload,null,2),"application/json");
    toast("Erreur PDF : synthese JSON exportee.");
  }
}

function bind(){
  document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>showView(b.dataset.view));
  bindAppearance();
  bindTools();
  initSignaturePad();
  bindPdfEngine();
  bindStudio();
  bindSettingsPanel();
  bindCharter();
  document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>showView(b.dataset.jump));
  if($("homePreviewBtn")) $("homePreviewBtn").onclick=()=>showHomePreviewModal();
  $("templateSearch").oninput=renderTemplates;$("templateFilter").onchange=renderTemplates;
  if($("assetSearch")) $("assetSearch").oninput=renderAssets;
  if($("assetFilter")) $("assetFilter").onchange=renderAssets;
  if($("assetFormatFilter")) $("assetFormatFilter").onchange=renderAssets;
  if($("assetSortFilter")) $("assetSortFilter").onchange=renderAssets;
  if($("libStorageManageBtn")) $("libStorageManageBtn").onclick=showLibraryStorageDetails;
  document.querySelectorAll("[data-tag-filter]").forEach(btn=>btn.onclick=()=>{
    state.library=state.library||{};
    state.library.activeTag=btn.dataset.tagFilter||"all";
    renderAssets();
  });
  if($("assetAddTagFilterBtn")) $("assetAddTagFilterBtn").onclick=()=>{
    const tag=prompt("Nom du tag a filtrer :");
    if(!tag||!tag.trim())return;
    state.library=state.library||{};
    state.library.activeTag=tag.trim().toLowerCase();
    renderAssets();
  };
  if($("libraryBatchClearBtn")) $("libraryBatchClearBtn").onclick=()=>{state.selectedAssetsForBatch=[];renderAssets();};
  if($("libraryBatchImportStudioBtn")) $("libraryBatchImportStudioBtn").onclick=importSelectedLibraryAssetsToStudio;
  if($("libraryBatchDeleteBtn")) $("libraryBatchDeleteBtn").onclick=deleteSelectedLibraryAssets;
  
  // Library sidebar bindings
  const bindLibNav = (id, filterValue) => {
    if($(id)) $(id).onclick = () => {
      if($("assetFilter")) $("assetFilter").value = filterValue;
      renderAssets();
      // handled by renderAssets -> syncLibraryNavActive
    };
  };

  bindLibNav("libNavAll", "all");
  bindLibNav("libNavLogos", "logo");
  bindLibNav("libNavBackgrounds", "background");
  bindLibNav("libNavIcons", "icon");
  bindLibNav("libNavMotifs", "motif");
  bindLibNav("libNavShapes", "shape");
  if($("addCategoryBtn")) $("addCategoryBtn").onclick=()=>{
    const name = prompt("Nom de la nouvelle catégorie :");
    if(name) apply(()=>{
      state.libraryCategories=state.libraryCategories||[];
      state.libraryCategories.push(name);
      toast("Catégorie ajoutée.");
    });
  };

  bindLibNav("libNavFavorites", "favorite");

  if($("backgroundSearch")) $("backgroundSearch").oninput=renderBackgrounds;
  if($("backgroundFilter")) $("backgroundFilter").onchange=renderBackgrounds;
  document.querySelectorAll("[data-icon-style]").forEach(b=>b.onclick=()=>apply(()=>state.design.iconStyle=b.dataset.iconStyle,true,"Style pictos"));
  const identityLabels={firstName:"Prenom",lastName:"Nom",jobTitle:"Poste",department:"Service",company:"Entreprise",phone:"Telephone",mobile:"Mobile",email:"Email",address:"Adresse",website:"Site web",linkedin:"LinkedIn",facebook:"Facebook",instagram:"Instagram",youtube:"YouTube",x:"X / Twitter"};
  Object.keys(state.identity).forEach(k=>{if($(k))$(k).oninput=()=>apply(()=>state.identity[k]=$(k).value,true,"Identite : "+(identityLabels[k]||k))});
  $("documentType").onchange=()=>apply(()=>{state.documentType=$("documentType").value;const m={signature:[900,280],banner:[1200,400],card:[1280,720],compact:[700,210]};[state.canvas.width,state.canvas.height]=m[state.documentType];autoLayout();},true,"Format document");
  $("layout").onchange=()=>apply(()=>{state.design.layout=$("layout").value;autoLayout();},true,"Mise en page");
  ["canvasWidth","canvasHeight"].forEach(id=>$(id).oninput=()=>apply(()=>state.canvas[id==="canvasWidth"?"width":"height"]=+$(id).value||1200,true,"Dimensions document"));
  const designLabels={bgStyle:"Fond",motif:"Motif",bg1:"Couleur fond 1",bg2:"Couleur fond 2",fg:"Couleur texte",accent:"Couleur accent"};
  ["bgStyle","motif","bg1","bg2","fg","accent"].forEach(id=>$(id).oninput=()=>apply(()=>state.design[id]=$(id).value,true,"Design : "+(designLabels[id]||id)));
  $("motifOpacity").oninput=()=>apply(()=>state.design.motifOpacity=+$("motifOpacity").value,true,"Opacite motif");
  $("radius").oninput=()=>apply(()=>state.canvas.radius=+$("radius").value,true,"Rayon document");
  $("previewFit").onchange=()=>apply(()=>state.preferences.previewFit=$("previewFit").value,true,"Mode apercu");
  if($("appTheme")) {
    $("appTheme").onchange=()=>apply(()=>state.preferences.appTheme=$("appTheme").value,true,"Theme application");
    document.querySelectorAll(".theme-swatch").forEach(btn => {
      btn.onclick = () => {
        if ($("appTheme")) $("appTheme").value = btn.dataset.themeValue;
        apply(()=>state.preferences.appTheme=btn.dataset.themeValue,true,"Theme application");
      };
    });
  }
  if($("resetThemeBtn")) {
    $("resetThemeBtn").onclick = () => {
      Object.keys(localStorage).forEach(key => {
        if (key.toLowerCase().includes("theme") || key.toLowerCase().includes("color") || key === "signaturePwaDarkMode") {
          localStorage.removeItem(key);
        }
      });
      document.documentElement.removeAttribute("style");
      if ($("appTheme")) $("appTheme").value = "ragt";
      if ($("darkModeToggle")) $("darkModeToggle").checked = false;
      document.body.classList.remove("dark-mode");
      apply(() => {
        state.preferences.appTheme = "ragt";
        state.preferences.globalDarkMode = false;
      },true,"Theme reinitialise");
      toast("Thème réinitialisé");
    };
  }
  $("emailMode").onchange=()=>apply(()=>state.preferences.emailMode=$("emailMode").value,true,"Mode email");
  $("zoom").oninput=()=>apply(()=>state.preferences.zoom=+$("zoom").value,true,"Zoom apercu");
  $("editMode").onchange=()=>apply(()=>state.preferences.editMode=$("editMode").checked,true,"Mode edition");
  if($("brandLock")) $("brandLock").onchange=()=>apply(()=>state.bulkSettings.brandLock=$("brandLock").checked,true,"Verrouillage charte");
  if($("requireFields")) $("requireFields").onchange=()=>apply(()=>state.bulkSettings.requiredFields=$("requireFields").checked,true,"Champs obligatoires");
  $("darkPreview").onchange=()=>apply(()=>state.preferences.darkPreview=$("darkPreview").checked,true,"Apercu sombre");
  if($("globalDarkMode")) $("globalDarkMode").onchange=()=>apply(()=>{
    state.preferences.globalDarkMode=$("globalDarkMode").checked;
    document.body.classList.toggle("dark-mode", !!state.preferences.globalDarkMode);
  },true,"Theme sombre global");
  $("autoSave").onchange=()=>apply(()=>state.preferences.autoSave=$("autoSave").checked,true,"Sauvegarde automatique");
  ["blockX","blockY","blockW","blockH"].forEach(id=>$(id).oninput=()=>apply(()=>{const b=state.blocks[state.selectedLayer];b[{blockX:"x",blockY:"y",blockW:"w",blockH:"h"}[id]]=+$(id).value||0;},true,"Calque : "+layerName(state.selectedLayer)));
  $("logoOpacity").oninput=()=>apply(()=>state.logo.opacity=+$("logoOpacity").value,true,"Opacite logo");
  $("logoSize").oninput=()=>apply(()=>state.logo.size=+$("logoSize").value,true,"Taille logo");
  if ($("aiGenerateLogoBtn")) $("aiGenerateLogoBtn").onclick = () => { $("aiAssetGeneratorModal").classList.remove("hidden"); };
  if ($("aiAssetGenerateSubmitBtn")) $("aiAssetGenerateSubmitBtn").onclick = async () => {
    const prompt=$("aiAssetPrompt")?.value||"";const type=$("aiAssetType")?.value||"logo";toast("Génération par IA en cours...");$("aiAssetGeneratorModal").classList.add("hidden");
    // Simulate generation delay
    await new Promise(r => setTimeout(r, 1500));
    const seed = Math.random().toString(36).substring(7);
    
    let src = `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=ffffff&shape1Color=0ea5e9&shape2Color=4f46e5&shape3Color=e2e8f0`;
    if(type === "icon") src = `https://api.dicebear.com/7.x/icons/svg?seed=${seed}&backgroundColor=ffffff`;
    if(type === "motif") src = `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}&backgroundColor=ffffff`;
    if(type === "shape") src = `https://api.dicebear.com/7.x/rings/svg?seed=${seed}&backgroundColor=ffffff`;
    if(type === "background") src = `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}&backgroundColor=ffffff`;

    
    apply(() => {
      const isLogo = type === "logo";
      const isBg = type === "background";
      const name = type + "_IA_" + seed + ".svg";
      if(isLogo) {
        state.logo.src = src;
        state.logo.name = name;
        state.selectedLayer = "logo";
      } else if (isBg) {
        state.background.src = src;
        state.background.name = name;
      }
      state.assets.unshift({
        id: "asset_ia_"+Date.now(),
        name: name,
        role: type,
        type: type,
        category: type + "s",
        src,
        tags: [type, "IA", prompt ? "Prompt" : "Aleatoire"]
      });
      toast("Asset généré et importé avec succès !");
    });

  };
  $("importLogoBtn").onclick=()=>{$("logoInput").value="";$("logoInput").click();};
  $("importBgBtn").onclick=()=>{$("bgInput").value="";$("bgInput").click();};
  if($("importShapeBtn")) $("importShapeBtn").onclick=()=>{$("shapeInput").value="";$("shapeInput").click();};
  $("logoInput").onchange=e=>{Array.from(e.target.files).forEach(f=>importLogo(f));e.target.value="";};
  $("bgInput").onchange=e=>{Array.from(e.target.files).forEach(f=>importBg(f));e.target.value="";};
  if($("shapeInput")) $("shapeInput").onchange=e=>{Array.from(e.target.files).forEach(f=>importShape(f));e.target.value="";};
  $("logoInputDirect").onchange=e=>{Array.from(e.target.files).forEach(f=>importLogo(f));e.target.value="";};
  $("bgInputDirect").onchange=e=>{Array.from(e.target.files).forEach(f=>importBg(f));e.target.value="";};
  if($("customIconInput")) $("customIconInput").onchange=e=>{importCustomIcon(state.pendingIconSlot||"email",e.target.files[0]);e.target.value="";};
  if($("customPhoneIcon")) $("customPhoneIcon").onchange=e=>{importCustomIcon("phone",e.target.files[0]);e.target.value="";};
  if($("customEmailIcon")) $("customEmailIcon").onchange=e=>{importCustomIcon("email",e.target.files[0]);e.target.value="";};
  if($("importAnyAssetBtn")) $("importAnyAssetBtn").onclick=()=>{$("anyAssetInput").value="";$("anyAssetInput").click();};
  if($("anyAssetInput")) $("anyAssetInput").onchange=e=>{importAnyAssets([...e.target.files]);e.target.value="";};
  if($("importLibraryJsonBtn")) $("importLibraryJsonBtn").onclick=()=>{$("libraryJsonInput").value="";$("libraryJsonInput").click();};
  if($("libraryJsonInput")) $("libraryJsonInput").onchange=e=>{importLibraryJson(e.target.files[0]);e.target.value="";};
  $("removeLogoBtn").onclick=()=>apply(()=>{state.logo.src="";state.logo.name=""});
  $("removeBgBtn").onclick=()=>apply(()=>{state.background.src="";state.background.name=""});
  $("exportLibraryBtn").onclick=()=>download("bibliotheque-signature.json",JSON.stringify({version:"18.0",assets:state.assets,customIcons:state.design.customIcons},null,2),"application/json");
  if($("exportLibraryJsonBtn")) $("exportLibraryJsonBtn").onclick=()=>{
    const metaAssets = state.assets.map(a => ({
      id: a.id,
      name: a.name,
      role: a.role,
      tags: a.tags,
      favorite: a.favorite,
      src: (a.src && a.src.startsWith('data:')) ? '(Base64 omitted)' : a.src
    }));
    download("bibliotheque-metadata.json", JSON.stringify({version:"18.0", assets: metaAssets}, null, 2), "application/json");
  };
  if($("libViewGridBtn")) $("libViewGridBtn").onclick=()=>apply(()=>{state.preferences.libraryViewMode="grid";});
  if($("libViewListBtn")) $("libViewListBtn").onclick=()=>apply(()=>{state.preferences.libraryViewMode="list";});
  bindActionIds(["newProjectBtn","homeNewProjectBtn"], newProjectAction);
  bindActionIds(["saveProjectBtn","homeSaveProjectBtn"], saveProjectAction);
  bindActionIds(["openProjectBtn","homeOpenProjectBtn"], openProjectAction);
  const openInput=$("openProjectInput");
  if(openInput) openInput.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state={...clone(DEFAULT_STATE),...JSON.parse(r.result)};normalize();state.ux.documentDirty=false;state.ux.lastModifiedAt=new Date().toISOString();state.ux.lastModifiedLabel="Ouverture";renderAll();toast("Projet ouvert.");}catch{toast("JSON invalide.");}};r.readAsText(f);};
  bindActionIds(["resetCacheBtn","homeResetCacheBtn"], resetCacheAction);
  if($("fullscreenAppBtn")) $("fullscreenAppBtn").onclick=()=>toggleAppFullscreen();
  bindActionIds(["simpleModeBtn","homeSimpleModeBtn"], toggleSimpleModeAction);
  updateSimpleModeLabels();
  bindActionIds(["compactUiBtn","homeCompactUiBtn"], toggleCompactUiAction);
  bindActionIds(["exportAppStateBtn","homeExportAppStateBtn"], exportAppStateAction);
  bindActionIds(["qualityBtn","homeQualityBtn"], qualityAction);
  bindActionIds(["helpBtn","homeHelpBtn"], helpAction);
  bindActionIds(["installBtn","homeInstallBtn"], installPwaAction);
  if($("projectNewCard")) $("projectNewCard").onclick=()=>$("newProjectBtn").click();
  if($("projectOpenCard")) $("projectOpenCard").onclick=()=>$("openProjectBtn").click();
  if($("projectSaveCard")) $("projectSaveCard").onclick=()=>$("saveProjectBtn").click();
  if($("projectExportCard")) $("projectExportCard").onclick=()=>download("projet-signature-v34.json",JSON.stringify(state,null,2),"application/json");
  if($("homeProjectNewCard")) $("homeProjectNewCard").onclick=()=>$("newProjectBtn").click();
  if($("homeProjectOpenCard")) $("homeProjectOpenCard").onclick=()=>$("openProjectBtn").click();
  if($("homeProjectSaveCard")) $("homeProjectSaveCard").onclick=()=>$("saveProjectBtn").click();
  if($("homeProjectExportCard")) $("homeProjectExportCard").onclick=()=>download("projet-signature-v34.json",JSON.stringify(state,null,2),"application/json");
  if($("importDocumentBtn")) $("importDocumentBtn").onclick=()=>{$("documentInput").value="";$("documentInput").click();};
  if($("documentInput")) $("documentInput").onchange=e=>{importDocuments([...e.target.files]);e.target.value="";};
  if($("clearDocumentsBtn")) $("clearDocumentsBtn").onclick=()=>showConfirmModal("Vider la liste ?", "Tous les documents seront supprimés.", () => apply(()=>{state.documents=[];state.ux.selectedDocumentIndex=-1;}));
  if($("documentModeBtn")) $("documentModeBtn").onclick=()=>{
    const open = $("documentPreviewBody")?.hidden !== false;
    setPreviewMode(open ? "document" : "signature");
    $("documentModeBtn").textContent=open ? "Mode signature" : "Mode lecture";
    toast(open ? "Mode lecture ouvert." : "Mode signature ouvert.");
  };
  if($("toggleSignerPanelBtn")) $("toggleSignerPanelBtn").onclick=()=>apply(()=>state.signer.open=!state.signer.open,false);
  if($("exportAnnotationPlanBtn")) $("exportAnnotationPlanBtn").onclick=()=>exportAnnotationPlan();
  if($("addSignatureBtn")) $("addSignatureBtn").onclick=()=>makeAnnotation("signature");
  if($("addTextAnnotationBtn")) $("addTextAnnotationBtn").onclick=()=>makeAnnotation("text");
  if($("addDateAnnotationBtn")) $("addDateAnnotationBtn").onclick=()=>makeAnnotation("date");
  if($("addStampAnnotationBtn")) $("addStampAnnotationBtn").onclick=()=>makeAnnotation("stamp");
  if($("addInitialsAnnotationBtn")) $("addInitialsAnnotationBtn").onclick=()=>makeAnnotation("initials");
  if($("addCheckboxAnnotationBtn")) $("addCheckboxAnnotationBtn").onclick=()=>makeAnnotation("checkbox");
  if($("clearAnnotationsBtn")) $("clearAnnotationsBtn").onclick=()=>showConfirmModal("Vider les annotations ?", "Toutes les annotations du document en cours seront supprimées.", () => apply(()=>{state.signer.annotations=[];state.signer.selectedAnnotationId="";}));
  if($("clearSignaturePadBtn")) $("clearSignaturePadBtn").onclick=()=>{const c=$("signaturePad");if(c){const ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,c.width,c.height);}};
  if($("saveSignaturePadBtn")) $("saveSignaturePadBtn").onclick=()=>saveSignaturePad();
  if($("importSignatureImageBtn")) $("importSignatureImageBtn").onclick=()=>{$("signatureImageInput").value="";$("signatureImageInput").click();};
  if($("signatureImageInput")) $("signatureImageInput").onchange=e=>{readImage(e.target.files[0],(src,f)=>apply(()=>{state.signer.signatureImage=src;state.assets.unshift({name:f.name,role:"signature-image",src,tags:["signature","document"]});toast("Signature image importée.");}));e.target.value="";};
  if($("aiGeneratePromptBtn")) $("aiGeneratePromptBtn").onclick=()=>{if($("promptText"))$("promptText").value=$("aiPromptText").value;generatePrompt();$("aiPromptResult").textContent=$("promptResult")?.textContent||"Proposition générée.";};
  if($("aiApplyPromptBtn")) $("aiApplyPromptBtn").onclick=()=>applyPrompt();
  if($("aiImprovePromptBtn")) $("aiImprovePromptBtn").onclick=()=>{$("aiPromptText").value=($("aiPromptText").value||"")+"\
Contraintes : logo indépendant, rendu Outlook, fond premium, pas de surcharge visuelle.";toast("Prompt amélioré.");};
  if($("qualityRunBtn")) $("qualityRunBtn").onclick=()=>{renderQualityPanel();toast("Contrôle qualité relancé.");};
  if($("qualityExportBtn")) $("qualityExportBtn").onclick=()=>exportQualityPanel();
  if($("importCsvBtn")) $("importCsvBtn").onclick=()=>{$("csvInput").value="";$("csvInput").click();};
  if($("csvInput")) $("csvInput").onchange=e=>{importCsvFile(e.target.files[0]);e.target.value="";};
  if($("pasteCsvBtn")) $("pasteCsvBtn").onclick=()=>$("csvPasteBox").classList.add("open");
  if($("closePasteCsvBtn")) $("closePasteCsvBtn").onclick=()=>$("csvPasteBox").classList.remove("open");
  if($("parsePastedCsvBtn")) $("parsePastedCsvBtn").onclick=()=>importCsvText($("csvPasteArea").value);
  if($("downloadSampleCsvBtn")) $("downloadSampleCsvBtn").onclick=()=>download("collaborateurs-exemple.csv",`firstName,lastName,jobTitle,department,company,phone,mobile,email,address,website,linkedin,facebook,instagram,youtube,x
Jean,Dupont,Responsable Marketing,Marketing,RAGT,+33 5 65 00 00 00,+33 6 00 00 00 00,jean.dupont@ragt.com,"Rue exemple, 12000 Rodez",www.ragt.com,https://linkedin.com/company/ragt,,,,
Marie,Martin,Chargée de communication,Communication,RAGT,+33 5 65 11 22 33,,marie.martin@ragt.com,"Rue exemple, 12000 Rodez",www.ragt.com,https://linkedin.com/company/ragt,,,,
`,"text/csv;charset=utf-8");
  if($("validateCollaboratorsBtn")) $("validateCollaboratorsBtn").onclick=()=>showQualityReport();
  if($("applySelectedCollaboratorBtn")) $("applySelectedCollaboratorBtn").onclick=()=>applySelectedCollaborator();
  if($("bulkExportHtmlBtn")) $("bulkExportHtmlBtn").onclick=()=>bulkExportHtml();
  if($("bulkExportPngBtn")) $("bulkExportPngBtn").onclick=()=>bulkExportImages("png");
  if($("bulkExportJpegBtn")) $("bulkExportJpegBtn").onclick=()=>bulkExportImages("jpeg");
  if($("bulkExportAllBtn")) $("bulkExportAllBtn").onclick=()=>bulkExportFullPack();
  if($("downloadProductionPackBtn")) $("downloadProductionPackBtn").onclick=()=>bulkExportFullPack();
  if($("clearCollaboratorsBtn")) $("clearCollaboratorsBtn").onclick=()=>showConfirmModal("Vider les collaborateurs ?", "Toute la liste sera effacée.", () => apply(()=>{state.collaborators=[];state.selectedCollaboratorIndex=-1;}));
  if($("helpBtn")) $("helpBtn").onclick=()=>toast("Aide : utilisez Accueil pour le projet, Studio pour la creation, Bibliotheque pour les assets, Parametres pour l etat du document et Export pour les fichiers finaux.");
  if($("fitBtn")) $("fitBtn").onclick=()=>apply(()=>state.preferences.previewFit="fit");
  if($("realBtn")) $("realBtn").onclick=()=>apply(()=>{state.preferences.previewFit="real";state.preferences.zoom=1});
  if($("undoBtn")) $("undoBtn").onclick=undo;
  if($("redoBtn")) $("redoBtn").onclick=redo;
  if($("toggleLayerBtn")) $("toggleLayerBtn").onclick=()=>apply(()=>state.blocks[state.selectedLayer].visible=!state.blocks[state.selectedLayer].visible,true,"Visibilite calque : "+layerName(state.selectedLayer));
  if($("lockLayerBtn")) $("lockLayerBtn").onclick=()=>apply(()=>state.blocks[state.selectedLayer].locked=!state.blocks[state.selectedLayer].locked,true,"Verrouillage calque : "+layerName(state.selectedLayer));
  if($("centerLayerBtn")) $("centerLayerBtn").onclick=()=>apply(()=>{const b=state.blocks[state.selectedLayer];b.x=Math.round((state.canvas.width-b.w)/2);b.y=Math.round((state.canvas.height-b.h)/2);},true,"Calque centre : "+layerName(state.selectedLayer));
  if($("bringFrontBtn")) $("bringFrontBtn").onclick=()=>bringFront();
  if($("sendBackwardBtn")) $("sendBackwardBtn").onclick=()=>sendBack();
  if($("duplicateLayerBtn2")) $("duplicateLayerBtn2").onclick=()=>duplicateBlock();
  if($("duplicateBlockBtn")) $("duplicateBlockBtn").onclick=()=>duplicateBlock();
  if($("deleteBlockBtn")) $("deleteBlockBtn").onclick=()=>deleteBlock();
  if($("moveLayerUpBtn")) $("moveLayerUpBtn").onclick=()=>moveLayer(state.selectedLayer,"up");
  if($("moveLayerDownBtn")) $("moveLayerDownBtn").onclick=()=>moveLayer(state.selectedLayer,"down");
  if($("sendBackBtn")) $("sendBackBtn").onclick=()=>sendBack();
  if($("bringFrontRealBtn")) $("bringFrontRealBtn").onclick=()=>bringFront();
  if($("resetLayoutBtn")) $("resetLayoutBtn").onclick=()=>apply(()=>autoLayout(),true,"Layout reinitialise");
  if($("generatePromptBtn")) $("generatePromptBtn").onclick=generatePrompt;
  if($("applyPromptBtn")) $("applyPromptBtn").onclick=applyPrompt;
  if($("copyHtmlBtn")) $("copyHtmlBtn").onclick=copyHtml;
  if($("copySourceBtn")) $("copySourceBtn").onclick=async ()=>{try{await navigator.clipboard.writeText(getEmailHtml());toast("Code source HTML copié !");}catch{toast("Erreur de copie");}};
  if($("downloadHtmlBtn")) $("downloadHtmlBtn").onclick=()=>download("signature.html",getEmailHtml(),"text/html;charset=utf-8");
  if($("downloadProjectBtn")) $("downloadProjectBtn").onclick=()=>download("projet-signature.json",JSON.stringify(state,null,2),"application/json");
  if($("downloadPngBtn")) $("downloadPngBtn").onclick=()=>exportImage("png");
  if($("downloadJpgBtn")) $("downloadJpgBtn").onclick=()=>exportImage("jpeg");
  if($("downloadLayersZipBtn")) $("downloadLayersZipBtn").onclick=exportLayersZip;
  if($("downloadZipBtn")) $("downloadZipBtn").onclick=downloadZip;
  if($("previewWrap")) {
    $("previewWrap").ondragover=e=>{e.preventDefault();$("previewWrap").classList.add("drop-ready")};
    $("previewWrap").ondragleave=()=>$("previewWrap").classList.remove("drop-ready");
    $("previewWrap").ondrop=e=>{e.preventDefault();$("previewWrap").classList.remove("drop-ready");importLogo(e.dataTransfer.files[0]);};
  }
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.ctrlKey || e.metaKey) {
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        if($("appearanceZoomInBtn")) $("appearanceZoomInBtn").click();
      } else if (e.key === "-") {
        e.preventDefault();
        if($("appearanceZoomOutBtn")) $("appearanceZoomOutBtn").click();
      } else if (e.key === "0") {
        e.preventDefault();
        apply(() => state.preferences.zoom = 1);
      }
    }
  });
  window.onresize=()=>{fitPreview();applyWorkspaceCols();};
}
function repairHomeVisualState(){
  if(document.body.dataset.view!=="home")return;
  document.documentElement.setAttribute("data-theme","ragt");
  document.body.classList.remove("dark-mode");
}
function showView(id){
  const requestedId=id;
  const aliases={projects:"home",ai:"studio"};
  id=aliases[id]||id;
  const simpleHiddenViews=["tools","ai","collaboration","connectors","ecosystem","backend","business-connectors","quality"];
  if(state.ux.simpleMode && simpleHiddenViews.includes(requestedId))id="home";
  if(!$(id))id="home";
  document.body.dataset.view=id;
  document.body.classList.toggle("app-view-home",id==="home");
  document.body.classList.toggle("app-view-studio",id==="studio");
  document.body.classList.toggle("app-view-settings",id==="settings");
  document.body.classList.toggle("app-view-documents",id==="documents");
  document.body.classList.toggle("app-view-library",id==="library");
  document.body.classList.toggle("app-view-appearance",id==="appearance");
  document.body.classList.toggle("app-view-charter",id==="charter");
  if(id==="home")repairHomeVisualState();
  document.querySelectorAll(".nav").forEach(b=>b.classList.toggle("active",b.dataset.view===id));
  document.querySelectorAll(".nav-group").forEach(g=>{
    if(g.querySelector(`.nav[data-view="${id}"]`))g.open=true;
  });
  document.querySelectorAll(".view").forEach(v=>{
    const isActive = v.id === id;
    v.classList.toggle("active", isActive);
    if(isActive) v.classList.add("animate-in");
  });
  setPreviewMode((id==="documents" || id==="tools") ? "document" : "signature");
  if(id==="appearance"){syncAppearanceControls();renderAppearance();}
  if(id==="library")renderAssets();
  if(id==="quality")renderQualityPanel();
  if(id==="documents"){renderDocuments();renderAnnotations();renderPdfEngine();}
  if(id==="tools")renderTools();
  if(id==="studio")renderStudio();
  if(id==="collaboration")renderCollaboration();
  if(id==="connectors")renderConnectors();
  if(id==="ecosystem")renderEcosystem();
  if(id==="backend")renderBackend();
  if(requestedId==="ai" && id==="studio")activateStudioPanel("studio-ai");
  applyWorkspaceCols();
  const activeView=$(id);
  if(activeView)activeView.scrollTo({top:0,left:0,behavior:"auto"});
  const panel=document.querySelector(".main-panel");
  if(panel)panel.scrollTo({top:0,left:0,behavior:"auto"});
  window.scrollTo({top:0,left:0,behavior:"auto"});
}
function openStudioWithTemplate(templateId){
  showView("studio");
  setTimeout(()=>applyStudioTemplate(templateId), 200);
}
function showViewFromHash(){
  const id=(location.hash||"").replace(/^#/,"");
  if(id)showView(id);
}
async function toggleAppFullscreen(){
  try{
    if(document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  }catch(e){
    toast("Plein écran refusé par le navigateur.");
  }
}
function syncAppFullscreenButton(){
  if($("fullscreenAppBtn")){
    const label=document.fullscreenElement?"Quitter le plein écran":"Plein écran";
    $("fullscreenAppBtn").title=label;
    $("fullscreenAppBtn").setAttribute("aria-label",label);
    $("fullscreenAppBtn").classList.toggle("is-fullscreen",!!document.fullscreenElement);
  }
}
function showConfirmModal(title, desc, onConfirm) {
  const modal = $("confirmModal");
  if (!modal) {
    if (confirm(title + "\n" + desc)) onConfirm();
    return;
  }
  $("confirmModalTitle").textContent = title;
  $("confirmModalDesc").textContent = desc;
  modal.classList.remove("hidden");
  
  // Trigger transition
  requestAnimationFrame(() => {
    modal.classList.remove("opacity-0");
    $("confirmModalBox").classList.remove("scale-95");
    $("confirmModalBox").classList.add("scale-100");
  });

  const close = () => {
    modal.classList.add("opacity-0");
    $("confirmModalBox").classList.remove("scale-100");
    $("confirmModalBox").classList.add("scale-95");
    setTimeout(() => modal.classList.add("hidden"), 300);
  };

  $("confirmModalCancelBtn").onclick = close;
  $("confirmModalConfirmBtn").onclick = () => {
    close();
    onConfirm();
  };
}

async function resetAppCache(){
  [
    "signaturePwaV34","signaturePwaV33","signaturePwaV32","signaturePwaV31",
    "signaturePwaV30","signaturePwaV29","signaturePwaV28","signaturePwaV27",
    "signaturePwaV26","signaturePwaV25","signaturePwaV24","signaturePwaV23",
    "signaturePwaV22","signaturePwaV21","signaturePwaV20","signaturePwaV19",
    "signaturePwaV18","signaturePwaV17","signaturePwaV16"
  ].forEach(k=>localStorage.removeItem(k));
  try{
    if(window.caches){
      const keys=await caches.keys();
      await Promise.all(keys.map(k=>caches.delete(k)));
    }
    if(navigator.serviceWorker){
      const regs=await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r=>r.unregister()));
    }
    toast("Cache vidé. Rechargement propre...");
    setTimeout(()=>location.reload(),500);
  }catch(e){
    toast("Cache local vidé. Recharge la page si nécessaire.");
  }
}
function generatePrompt(){
  const p=$("promptText").value.toLowerCase();let id="dashboard-yellow";
  if(p.includes("tech")||p.includes("innovation")||p.includes("hex"))id="agritech";
  if(p.includes("premium")||p.includes("noir")||p.includes("or"))id="black-gold";
  if(p.includes("minimal")||p.includes("blanc")||p.includes("sobre"))id="clean-white";
  if(p.includes("nature")||p.includes("feuille"))id="nature-soft";
  promptProposal=templates.find(t=>t.id===id);
  $("promptResult").textContent=JSON.stringify({proposition:id,mode:"local",note:"Aucune donnée envoyée en ligne."},null,2);
  toast("Proposition générée.");
}
function applyPrompt(){if(!promptProposal)return toast("Aucune proposition.");applyTemplate(promptProposal);}
function getEmailHtml(){return $("signaturePreview").innerHTML.replace(/<span class="drag-handle"[\s\S]*?<\/span>/g,"").replace(/\sdata-block="[^"]*"/g,"");}
function stripHtml(h){return h.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim();}
async function copyHtml(){
  const h=getEmailHtml();
  const plain=stripHtml(h);
  try{
    if(navigator.clipboard?.write && window.ClipboardItem){
      await navigator.clipboard.write([new ClipboardItem({"text/html":new Blob([h],{type:"text/html"}),"text/plain":new Blob([plain],{type:"text/plain"})})]);
      toast("HTML copie.");
      return true;
    }
  }catch(e){
    console.warn("Copie HTML indisponible",e);
  }
  try{
    if(navigator.clipboard?.writeText){
      await navigator.clipboard.writeText(h);
      toast("HTML copie en texte brut.");
      return true;
    }
  }catch(e){
    console.warn("Copie texte indisponible",e);
  }
  download("signature.html",h,"text/html;charset=utf-8");
  toast("Presse-papiers indisponible : fichier HTML telecharge.");
  return false;
}
function download(name,content,type){const b=content instanceof Blob?content:new Blob([content],{type});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
function loadImg(src){return new Promise(res=>{if(!src)return res(null);const i=new Image();try{const u=new URL(src,location.href);if(/^https?:$/.test(u.protocol))i.crossOrigin="anonymous";}catch(e){}i.onload=()=>res(i);i.onerror=()=>res(null);i.src=src;});}
async function exportImage(kind){
  const c=$("exportCanvas"),ctx=c.getContext("2d");
  c.width=state.canvas.width*2;
  c.height=state.canvas.height*2;
  ctx.setTransform(2,0,0,2,0,0);
  await drawCanvas(ctx);
  const type=kind==="jpeg"?"image/jpeg":"image/png";
  const name=kind==="jpeg"?"signature.jpg":"signature.png";
  const blob=await canvasBlob(type,.92);
  if(!blob){toast("Export image bloque : importez les images distantes en local avant l'export.");return;}
  download(name,blob,type);
}

async function exportLayersZip() {
  const entries = [];
  const c = $("exportCanvas");
  const ctx = c.getContext("2d");
  c.width = state.canvas.width * 2;
  c.height = state.canvas.height * 2;
  const w = state.canvas.width;
  const h = state.canvas.height;
  
  // Background
  ctx.setTransform(2,0,0,2,0,0);
  ctx.clearRect(0, 0, w, h);
  const grd = ctx.createLinearGradient(0, 0, w, h);
  grd.addColorStop(0, state.design.bg1);
  grd.addColorStop(1, state.design.bg2);
  ctx.fillStyle = state.design.bgStyle === "solid" ? state.design.bg1 : grd;
  ctx.fillRect(0, 0, w, h);
  if (state.background.src) {
    const img = await loadImg(state.background.src);
    if (img) {
      ctx.globalAlpha = state.background.opacity;
      ctx.drawImage(img, 0, 0, w, h);
      ctx.globalAlpha = 1;
    }
  }
  let blob = await canvasBlob("image/png", 1);
  if(!blob){toast("Export calques bloque : importez les images distantes en local avant l'export.");return;}
  entries.push(["fond.png", await blobToUint8Array(blob)]);

  // Logo
  ctx.setTransform(2,0,0,2,0,0);
  ctx.clearRect(0, 0, w, h);
  if (state.logo.src) {
    const img = await loadImg(state.logo.src);
    if (img) {
      const b = state.blocks.logo;
      const s = Math.min(state.logo.size / img.width, b.h / img.height, 2);
      const iw = img.width * s;
      const ih = img.height * s;
      ctx.globalAlpha = state.logo.opacity;
      ctx.drawImage(img, b.x + (b.w - iw) / 2, b.y + (b.h - ih) / 2, iw, ih);
      ctx.globalAlpha = 1;
      blob = await canvasBlob("image/png", 1);
      if(!blob){toast("Logo non exportable : importez l'image en local avant l'export.");return;}
      entries.push(["logo.png", await blobToUint8Array(blob)]);
    }
  }

  // Text
  ctx.setTransform(2,0,0,2,0,0);
  ctx.clearRect(0, 0, w, h);
  const tb = state.blocks.text;
  if(tb && tb.visible!==false) {
    ctx.fillStyle = state.design.fg; ctx.font = "900 42px Arial";
    ctx.fillText(((state.identity.firstName || "FIRSTNAME") + " " + (state.identity.lastName || "LASTNAME")).toUpperCase(), tb.x, tb.y + 48);
    ctx.fillStyle = state.design.accent; ctx.font = "800 20px Arial";
    ctx.fillText((state.identity.jobTitle || "MARKETING MANAGER").toUpperCase(), tb.x, tb.y + 86);
    ctx.fillRect(tb.x, tb.y + 104, 86, 4);
    ctx.fillStyle = state.design.fg; ctx.font = "18px Arial"; let ty = tb.y + 145;
    [state.identity.phone || "+33 0 00 00 00 00", state.identity.email || "prenom.nom@ragt.com", state.identity.address || "123 Anywhere Street, City", state.identity.website || "www.ragt.com"].forEach(t => { ctx.fillText(t, tb.x + 46, ty); ty += 34; });
    blob = await canvasBlob("image/png", 1);
    if(!blob){toast("Texte non exportable : importez les images distantes en local avant l'export.");return;}
    entries.push(["texte.png", await blobToUint8Array(blob)]);
  }

  const zip = makeZipBinary(entries);
  download("calques-signature.zip", zip, "application/zip");
  toast("Fichiers par calque (ZIP) exportés.");
}
async function drawCanvas(ctx){
  const w=state.canvas.width,h=state.canvas.height;
  ctx.fillStyle="#ffffff";
  ctx.fillRect(0,0,w,h);
  const grd=ctx.createLinearGradient(0,0,w,h);grd.addColorStop(0,state.design.bg1);grd.addColorStop(1,state.design.bg2);ctx.fillStyle=state.design.bgStyle==="solid"?state.design.bg1:grd;ctx.fillRect(0,0,w,h);
  if(state.background.src){const img=await loadImg(state.background.src);if(img){ctx.globalAlpha=state.background.opacity;ctx.drawImage(img,0,0,w,h);ctx.globalAlpha=1;}}
  if(state.logo.src){const img=await loadImg(state.logo.src);if(img){const b=state.blocks.logo,s=Math.min(state.logo.size/img.width,b.h/img.height,2),iw=img.width*s,ih=img.height*s;ctx.globalAlpha=state.logo.opacity;ctx.drawImage(img,b.x+(b.w-iw)/2,b.y+(b.h-ih)/2,iw,ih);ctx.globalAlpha=1;}}
  const b=state.blocks.text;ctx.fillStyle=state.design.fg;ctx.font="900 42px Arial";ctx.fillText(((state.identity.firstName||"FIRSTNAME")+" "+(state.identity.lastName||"LASTNAME")).toUpperCase(),b.x,b.y+48);ctx.fillStyle=state.design.accent;ctx.font="800 20px Arial";ctx.fillText((state.identity.jobTitle||"MARKETING MANAGER").toUpperCase(),b.x,b.y+86);ctx.fillRect(b.x,b.y+104,86,4);
  ctx.fillStyle=state.design.fg;ctx.font="18px Arial";let y=b.y+145;[state.identity.phone||"+33 0 00 00 00 00",state.identity.email||"prenom.nom@ragt.com",state.identity.address||"123 Anywhere Street, City",state.identity.website||"www.ragt.com"].forEach(t=>{ctx.fillText(t,b.x+46,y);y+=34;});
}
function makeZip(files){
  // Minimal no-compression ZIP. Parce que même sans bibliothèque externe, on va éviter le faux bouton.
  const enc=new TextEncoder();let chunks=[],central=[],offset=0;
  const crcTable=(()=>{let c,t=[];for(let n=0;n<256;n++){c=n;for(let k=0;k<8;k++)c=((c&1)?(0xedb88320^(c>>>1)):(c>>>1));t[n]=c>>>0;}return t;})();
  const crc32=u=>{let c=0xffffffff;for(let i=0;i<u.length;i++)c=crcTable[(c^u[i])&255]^(c>>>8);return (c^0xffffffff)>>>0;};
  const u16=n=>new Uint8Array([n&255,(n>>>8)&255]); const u32=n=>new Uint8Array([n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]);
  for(const [name,text] of files){const n=enc.encode(name),d=enc.encode(text),crc=crc32(d);const local=[u32(0x04034b50),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(d.length),u32(d.length),u16(n.length),u16(0),n,d];chunks.push(...local);central.push([name,n,d.length,crc,offset]);offset+=local.reduce((s,a)=>s+a.length,0);}
  let centralStart=offset;for(const [name,n,len,crc,ofs] of central){const c=[u32(0x02014b50),u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(len),u32(len),u16(n.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(ofs),n];chunks.push(...c);offset+=c.reduce((s,a)=>s+a.length,0);}
  const centralSize=offset-centralStart;chunks.push(u32(0x06054b50),u16(0),u16(0),u16(central.length),u16(central.length),u32(centralSize),u32(centralStart),u16(0));
  return new Blob(chunks,{type:"application/zip"});
}

function makeZipBinary(entries){
  const enc=new TextEncoder();
  let chunks=[],central=[],offset=0;
  const crcTable=(()=>{let c,t=[];for(let n=0;n<256;n++){c=n;for(let k=0;k<8;k++)c=((c&1)?(0xedb88320^(c>>>1)):(c>>>1));t[n]=c>>>0;}return t;})();
  const crc32=u=>{let c=0xffffffff;for(let i=0;i<u.length;i++)c=crcTable[(c^u[i])&255]^(c>>>8);return (c^0xffffffff)>>>0;};
  const u16=n=>new Uint8Array([n&255,(n>>>8)&255]);
  const u32=n=>new Uint8Array([n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255]);
  for(const [name,content] of entries){
    const n=enc.encode(name);
    const d=content instanceof Uint8Array ? content : enc.encode(String(content));
    const crc=crc32(d);
    const local=[u32(0x04034b50),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(d.length),u32(d.length),u16(n.length),u16(0),n,d];
    chunks.push(...local);
    central.push([name,n,d.length,crc,offset]);
    offset+=local.reduce((s,a)=>s+a.length,0);
  }
  const centralStart=offset;
  for(const [name,n,len,crc,ofs] of central){
    const c=[u32(0x02014b50),u16(20),u16(20),u16(0),u16(0),u16(0),u16(0),u32(crc),u32(len),u32(len),u16(n.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(ofs),n];
    chunks.push(...c);
    offset+=c.reduce((s,a)=>s+a.length,0);
  }
  const centralSize=offset-centralStart;
  chunks.push(u32(0x06054b50),u16(0),u16(0),u16(central.length),u16(central.length),u32(centralSize),u32(centralStart),u16(0));
  return new Blob(chunks,{type:"application/zip"});
}

function downloadZip(){const blob=makeZip([["signature.html",getEmailHtml()],["projet-signature.json",JSON.stringify(state,null,2)],["rapport-qualite.json",JSON.stringify(buildQualityReport(),null,2)],["README.txt","Export généré par Signature Studio v34."]]);download("signature-export.zip",blob,"application/zip");}
function undo(){if(!history.length)return toast("Rien à annuler.");future.push(clone(state));state=history.pop();normalize();renderAll();}
function redo(){if(!future.length)return toast("Rien à rétablir.");history.push(clone(state));state=future.pop();normalize();renderAll();}
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstallPrompt=e;});
async function init(){
  await loadTemplates();
  const saved=localStorage.getItem("signaturePwaV34") || localStorage.getItem("signaturePwaV33") || localStorage.getItem("signaturePwaV32") || localStorage.getItem("signaturePwaV31") || localStorage.getItem("signaturePwaV30") || localStorage.getItem("signaturePwaV29") || localStorage.getItem("signaturePwaV28") || localStorage.getItem("signaturePwaV27") || localStorage.getItem("signaturePwaV26") || localStorage.getItem("signaturePwaV25") || localStorage.getItem("signaturePwaV24") || localStorage.getItem("signaturePwaV23") || localStorage.getItem("signaturePwaV22") || localStorage.getItem("signaturePwaV21") || localStorage.getItem("signaturePwaV20") || localStorage.getItem("signaturePwaV19") || localStorage.getItem("signaturePwaV18") || localStorage.getItem("signaturePwaV17") || localStorage.getItem("signaturePwaV16");
  if(saved){try{state={...clone(DEFAULT_STATE),...JSON.parse(saved)};}catch{}}
  normalize();ensureHomeDashboard();bind();initWorkspaceResize();document.addEventListener("fullscreenchange",syncAppFullscreenButton);syncAppFullscreenButton();document.body.classList.toggle("simple-mode",!!state.ux.simpleMode);updateSimpleModeLabels();renderAll();showViewFromHash();if(!location.hash)showView("home");window.addEventListener("hashchange",showViewFromHash);
  initGlobalSearch();
  const handleInstall = async () => {
    if (deferredInstallPrompt) {
      try {
        const choiceResult = await deferredInstallPrompt.prompt();
        if (choiceResult && choiceResult.outcome === "accepted") {
          toast("Merci d'avoir installé l'application !");
          deferredInstallPrompt = null;
        } else {
          toast("Installation annulée.");
        }
      } catch (err) {
        toast("Erreur lors de l'installation : " + err.message);
      }
    } else {
      if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
        toast("L'application est déjà installée.");
      } else {
        toast("Installation disponible depuis HTTPS ou navigateur compatible (Chrome, Edge, Safari...).");
      }
    }
  };
  bindActionIds(["installBtn","homeInstallBtn"], installPwaAction);
  if ($("manualInstallBtn")) $("manualInstallBtn").onclick = installPwaAction;
}

// PDF.js rendering helper
async function renderPdfToContainer(url, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    container.innerHTML = ''; // Clear loading message

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      
      const canvas = document.createElement('canvas');
      canvas.className = 'pdf-page-canvas shadow-md mb-8 mx-auto block bg-white';
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;

      container.appendChild(canvas);
    }
  } catch (error) {
    console.error("PDF rendering error:", error);
    container.innerHTML = `<div class="p-8 text-center text-red-600 bg-red-50 rounded-xl">
      <p class="font-bold">Erreur de rendu PDF</p>
      <p class="text-sm opacity-80">${error.message}</p>
      <button class="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm" onclick="openPdfInNewTab(${state.ux.selectedDocumentIndex})">Ouvrir dans un onglet</button>
    </div>`;
  }
}

window.shareCurrentProject = async function() {
  const shareData = {
    title: 'Signature Studio - Projet en cours',
    text: 'Découvrez mon projet de signature sur Signature Studio',
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      toast("Partage réussi !");
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast("Lien copié dans le presse-papier !");
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Error sharing:', err);
      toast("Erreur lors du partage");
    }
  }
};

window.archiveCurrentProject = function(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const overlay = document.getElementById('archiveModalOverlay');
  const content = document.getElementById('archiveModalContent');
  if (overlay && content) {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => {
      content.classList.remove('scale-95', 'opacity-0');
      content.classList.add('scale-100', 'opacity-100');
    }, 10);
  }
};

window.closeArchiveModal = function() {
  const overlay = document.getElementById('archiveModalOverlay');
  const content = document.getElementById('archiveModalContent');
  if (overlay && content) {
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      overlay.classList.remove('flex');
      overlay.classList.add('hidden');
    }, 200);
  }
};

window.confirmArchiveProject = function() {
  localStorage.setItem('currentProjectArchived', 'true');
  const card = document.getElementById('currentProjectCard');
  if (card) {
    card.style.display = 'none';
    toast("Projet archivé avec succès");
  }
  closeArchiveModal();
};

window.toggleFavoriteProject = function(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  let isFav = localStorage.getItem('currentProjectFavorite') === 'true';
  isFav = !isFav;
  localStorage.setItem('currentProjectFavorite', isFav);
  updateFavoriteStar(isFav);
  if (isFav) toast("Projet ajouté aux favoris");
  else toast("Projet retiré des favoris");
};

function updateFavoriteStar(isFav) {
  const btn = document.getElementById('favoriteProjectBtn');
  if (!btn) return;
  const icon = btn.querySelector('svg');
  btn.classList.toggle('text-amber-400', !!isFav);
  btn.classList.toggle('text-slate-400', !isFav);
  btn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
  btn.title = isFav ? 'Retirer des favoris' : 'Ajouter aux favoris';
  if (icon) {
    icon.setAttribute('fill', isFav ? 'currentColor' : 'none');
  } else if (btn.textContent.trim() === '?' || btn.textContent.trim() === '?') {
    btn.textContent = isFav ? '?' : '?';
  }
}

// Context Menu Handlers
function projectCardTitle(card=document.getElementById('currentProjectCard')) {
  return card?.querySelector('[data-project-title], h2')?.textContent?.trim() || localStorage.getItem('currentProjectName') || 'Signature email RAGT';
}
function setProjectCardTitle(name, card=document.getElementById('currentProjectCard')) {
  const clean = String(name || '').trim().slice(0, 90);
  if(!clean) return;
  const title = card?.querySelector('[data-project-title], h2');
  if(title) {
    title.textContent = clean;
    title.setAttribute('data-project-title', 'true');
  }
  localStorage.setItem('currentProjectName', clean);
}
window.renameProject = function() {
  const card = window.contextMenuTarget || document.getElementById('currentProjectCard'); window.contextMenuTarget = null;
  const name = prompt("Nouveau nom du projet :", projectCardTitle(card));
  if(!name || !name.trim()) return;
  setProjectCardTitle(name, card);
  const menu = document.getElementById('projectContextMenu');
  if(menu) menu.classList.add('hidden');
  toast("Projet renomme.");
};
window.duplicateProject = function() {
  const originalCard = window.contextMenuTarget || document.getElementById('currentProjectCard'); window.contextMenuTarget = null;
  if (!originalCard) return;
  const newCard = originalCard.cloneNode(true);
  
  newCard.id = 'project_' + Math.floor(Math.random() * 10000);
  
  const elementsWithId = newCard.querySelectorAll('[id]');
  elementsWithId.forEach(el => el.removeAttribute('id'));
  
  const titleEl = newCard.querySelector('h2');
  if (titleEl) {
    titleEl.textContent = titleEl.textContent + " (Copie)";
  }
  
  const textareas = originalCard.querySelectorAll('textarea');
  const newTextareas = newCard.querySelectorAll('textarea');
  textareas.forEach((ta, i) => {
    if (newTextareas[i]) newTextareas[i].value = ta.value;
  });

  const inputs = originalCard.querySelectorAll('input');
  const newInputs = newCard.querySelectorAll('input');
  inputs.forEach((input, i) => {
    if (newInputs[i]) {
      if (input.type === 'checkbox' || input.type === 'radio') {
        newInputs[i].checked = input.checked;
      } else {
        newInputs[i].value = input.value;
      }
    }
  });

  // Ensure tags are cloned properly (they are in the DOM)
  
  newCard.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const menu = document.getElementById('projectContextMenu');
    if (menu) {
      menu.classList.remove('hidden'); window.contextMenuTarget = newCard;
      
      let x = e.pageX;
      let y = e.pageY;
      
      if (x + menu.offsetWidth > window.innerWidth) {
        x = window.innerWidth - menu.offsetWidth - 10;
      }
      if (y + menu.offsetHeight > window.innerHeight) {
        y = window.innerHeight - menu.offsetHeight - 10;
      }
      
      menu.style.left = x + 'px';
      menu.style.top = y + 'px';
      
      // store current target
      window.contextMenuTarget = newCard;
    }
  });

  originalCard.parentNode.insertBefore(newCard, originalCard.nextSibling);
  
  if (typeof toast !== "undefined") {
    toast("Projet dupliqué avec succès");
  } else if (typeof showToast !== "undefined") {
    showToast("Projet dupliqué avec succès", "success");
  }
};
window.viewProjectDetails = function() {
  const card = window.contextMenuTarget || document.getElementById('currentProjectCard'); window.contextMenuTarget = null;
  document.getElementById('projectDetailsModal')?.remove();
  const title = projectCardTitle(card);
  const tags = [...(card || document).querySelectorAll('#projectTagsContainer [id^="tag_"], #projectTagsContainer .tag, #projectTagsContainer [class*="bg-"]')]
    .map(el => el.textContent.trim())
    .filter(Boolean)
    .slice(0, 8);
  const modal = document.createElement('div');
  modal.id = 'projectDetailsModal';
  modal.className = 'background-preview-modal';
  modal.innerHTML = `
    <div class="background-preview-box" role="dialog" aria-modal="true">
      <div class="background-preview-head">
        <div>
          <span>Projet</span>
          <h3>${esc(title)}</h3>
        </div>
        <button id="projectDetailsCloseBtn" type="button">Fermer</button>
      </div>
      <div class="project-details-grid">
        <div><span>Statut</span><strong>${esc(document.getElementById('projectStatusBadge')?.textContent?.trim() || 'Actif')}</strong></div>
        <div><span>Format</span><strong>${esc(state.canvas.width)} x ${esc(state.canvas.height)}</strong></div>
        <div><span>Documents</span><strong>${esc(state.documents.length)}</strong></div>
        <div><span>Assets</span><strong>${esc(state.assets.length)}</strong></div>
        <div><span>Studio</span><strong>${esc(state.studio.pages.length)} page(s)</strong></div>
        <div><span>Derniere action</span><strong>${esc(state.ux.lastModifiedLabel || 'Aucune')}</strong></div>
      </div>
      <div class="project-details-tags">${tags.length ? tags.map(t => `<span>${esc(t)}</span>`).join('') : '<span>Aucun tag</span>'}</div>
    </div>`;
  document.body.appendChild(modal);
  const close = () => modal.remove();
  document.getElementById('projectDetailsCloseBtn').onclick = close;
  modal.onclick = e => { if(e.target === modal) close(); };
};

// Check on load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('currentProjectArchived') === 'true') {
    const card = document.getElementById('currentProjectCard');
    if (card) card.style.display = 'none';
  }
  
  let isFav = localStorage.getItem('currentProjectFavorite') === 'true';
  updateFavoriteStar(isFav);
  
  const card = document.getElementById('currentProjectCard');
  const menu = document.getElementById('projectContextMenu');
  const storedProjectName = localStorage.getItem('currentProjectName');
  if(card && storedProjectName) setProjectCardTitle(storedProjectName, card);
  
  if (card && menu) {
    card.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
      menu.classList.remove('hidden'); window.contextMenuTarget = card;
      
      let x = e.pageX;
      let y = e.pageY;
      
      if (x + menu.offsetWidth > window.innerWidth) {
        x = window.innerWidth - menu.offsetWidth - 10;
      }
      if (y + menu.offsetHeight > window.innerHeight) {
        y = window.innerHeight - menu.offsetHeight - 10;
      }
      
      menu.style.left = x + 'px';
      menu.style.top = y + 'px';
    });
    
    document.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  }
});

init();

// === Nouveau code : Halo lumineux ===
document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('currentProjectCard');
  if (card) {
    card.addEventListener('click', function(e) {
      // Ignorer si on clique sur un bouton, un SVG ou <summary>
      if (e.target.closest('button') || e.target.closest('summary')) return;

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const circle = document.createElement('span');
      circle.classList.add('halo-ripple');
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
      
      const diameter = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = diameter + 'px';
      circle.style.marginLeft = circle.style.marginTop = (-diameter / 2) + 'px';
      
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  }
});

// === Nouveau code : Export CSV des logs ===
window.exportProjectLogs = function() {
  const logs = [
    ["Date", "Heure", "Action", "Utilisateur"],
    ["2023-10-25", "14:30", "Modification du logo principal", "User"],
    ["2023-10-25", "14:15", "Ajout d'une bannière de campagne", "User"],
    ["2023-10-25", "10:00", "Création du projet", "User"]
  ];
  const csvContent = "data:text/csv;charset=utf-8," + logs.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "historique_projet.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast("Historique exporté (CSV)");
};

// === Nouveau code : Badge de statut dynamique ===
document.addEventListener('DOMContentLoaded', () => {
  // Simule un statut basé sur le localStorage
  let status = localStorage.getItem('projectStatus');
  if (!status) {
    status = 'En cours'; // Par défaut
    localStorage.setItem('projectStatus', status);
  }
  
  const badge = document.getElementById('projectStatusBadge');
  if (badge) {
    badge.textContent = status;
    // Couleurs dynamiques
    badge.className = "absolute top-0 left-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-br-xl z-10";
    if (status === 'En cours') badge.classList.add('bg-[#90b9d4]');
    else if (status === 'En attente') badge.classList.add('bg-amber-500');
    else if (status === 'Approuvé') badge.classList.add('bg-[#6ba56f]');
    else badge.classList.add('bg-slate-500');
  }
});

// === Nouveau code : Vue Carte / Liste, Notes, Tags, Progression ===

window.toggleProjectViewMode = function(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const card = document.getElementById('currentProjectCard');
  const content = document.getElementById('currentProjectCardContent');
  const icon = document.getElementById('currentProjectIcon');
  if (!card || !content || !icon) return;
  
  const isList = card.classList.contains('p-3');
  if (isList) {
    // Switch to Card mode
    card.classList.remove('p-3');
    card.classList.add('p-6');
    content.classList.remove('md:flex-row', 'items-center', 'gap-4');
    content.classList.add('md:flex-row', 'items-center', 'gap-6');
    icon.classList.remove('w-12', 'h-12', 'text-2xl', 'rounded-lg');
    icon.classList.add('w-24', 'h-24', 'text-4xl', 'rounded-2xl');
    toast("Vue Carte activée");
  } else {
    // Switch to List mode
    card.classList.remove('p-6');
    card.classList.add('p-3');
    content.classList.remove('gap-6');
    content.classList.add('gap-4');
    icon.classList.remove('w-24', 'h-24', 'text-4xl', 'rounded-2xl');
    icon.classList.add('w-12', 'h-12', 'text-2xl', 'rounded-lg');
    toast("Vue Liste activée");
  }
};

window.toggleProjectNotes = function() {
  const popup = document.getElementById('projectNotesPopup');
  if (popup) {
    popup.classList.toggle('hidden');
    if (!popup.classList.contains('hidden')) {
      const textarea = document.getElementById('projectNotesTextarea');
      if (textarea) {
        textarea.value = localStorage.getItem('currentProjectNotes') || '';
        textarea.focus();
      }
    }
  }
};

window.saveProjectNotes = function() {
  const textarea = document.getElementById('projectNotesTextarea');
  const popup = document.getElementById('projectNotesPopup');
  if (textarea && popup) {
    localStorage.setItem('currentProjectNotes', textarea.value);
    popup.classList.add('hidden');
    toast("Notes enregistrées");
  }
};

window.handleTagInput = function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const input = e.target;
    const value = input.value.trim();
    if (value) {
      addProjectTag(value);
      input.value = '';
    }
  }
};

window.addProjectTag = function(tag) {
  let tags = JSON.parse(localStorage.getItem('currentProjectTags') || '[]');
  if (!tags.includes(tag)) {
    tags.push(tag);
    localStorage.setItem('currentProjectTags', JSON.stringify(tags));
    renderProjectTags();
  }
};

window.removeProjectTag = function(tag, event) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  let tags = JSON.parse(localStorage.getItem('currentProjectTags') || '[]');
  tags = tags.filter(t => t !== tag);
  localStorage.setItem('currentProjectTags', JSON.stringify(tags));
  renderProjectTags();
};

window.renderProjectTags = function() {
  const container = document.getElementById('projectTagsContainer');
  const addWrapper = document.getElementById('addTagWrapper');
  if (!container || !addWrapper) return;
  
  // Remove existing tags
  const existingTags = container.querySelectorAll('.project-custom-tag');
  existingTags.forEach(el => el.remove());
  
  const tags = JSON.parse(localStorage.getItem('currentProjectTags') || '[]');
  tags.forEach(tag => {
    const el = document.createElement('div');
    el.className = 'project-custom-tag flex items-center gap-1 bg-slate-100 text-[#273540] px-2 py-0.5 rounded text-[10px] font-bold';
    el.innerHTML = `<span>${tag}</span><button onclick="removeProjectTag('${tag}', event)" class="hover:text-red-500 ml-1 leading-none">&times;</button>`;
    container.insertBefore(el, addWrapper);
  });
};

// Initialize Tags and Progress on load
document.addEventListener('DOMContentLoaded', () => {
  renderProjectTags();
  
  // Fake progress based on localStorage
  let dueDateStr = localStorage.getItem('currentProjectDueDate');
  if (!dueDateStr) {
    const date = new Date();
    date.setDate(date.getDate() + 10); // 10 days from now
    dueDateStr = date.toISOString();
    localStorage.setItem('currentProjectDueDate', dueDateStr);
  }
  
  const dueDate = new Date(dueDateStr);
  const now = new Date();
  const totalDays = 30; // Assuming 30 days total for the project
  const diffTime = Math.max(0, dueDate - now);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const progressPercent = Math.max(0, Math.min(100, Math.round(((totalDays - diffDays) / totalDays) * 100)));
  
  const progressText = document.getElementById('projectProgressText');
  const progressBar = document.getElementById('projectProgressBar');
  if (progressText && progressBar) {
    progressText.textContent = progressPercent + '%';
    progressBar.style.width = progressPercent + '%';
  }
  
  // Close notes popup when clicking outside
  document.addEventListener('click', (e) => {
    const popup = document.getElementById('projectNotesPopup');
    if (popup && !popup.classList.contains('hidden') && !e.target.closest('#projectNotesPopup') && !e.target.closest('button[onclick="toggleProjectNotes()"]')) {
      popup.classList.add('hidden');
    }
  });
});

// === Nouveau code : Raccourcis clavier, Agrandissement, Filtrage ===

window.expandProjectCard = function(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  const card = document.getElementById('currentProjectCard');
  if (!card) return;
  
  const isExpanded = card.classList.contains('fixed');
  if (!isExpanded) {
    // Add placeholder to maintain layout
    const placeholder = document.createElement('div');
    placeholder.id = 'currentProjectCardPlaceholder';
    placeholder.style.height = card.offsetHeight + 'px';
    placeholder.style.marginBottom = window.getComputedStyle(card).marginBottom;
    card.parentNode.insertBefore(placeholder, card);

    // Expand
    card.classList.add('fixed', 'inset-4', 'z-[100]', 'overflow-auto', 'scale-100');
    card.classList.remove('relative', 'transition-transform', 'hover:scale-105');
    
    // Change expand icon to compress
    const btn = e.currentTarget;
    if(btn) btn.innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14h6m0 0v6m0-6l-7 7m17-11h-6m0 0V4m0 6l7-7m-7 17v-6m0 0h6m0 0l7 7M10 10H4m6 0V4m0 6l-7-7"></path></svg>';
    toast("Mode plein écran activé");
  } else {
    // Remove placeholder
    const placeholder = document.getElementById('currentProjectCardPlaceholder');
    if (placeholder) placeholder.remove();

    // Restore
    card.classList.remove('fixed', 'inset-4', 'z-[100]', 'overflow-auto', 'scale-100');
    card.classList.add('relative', 'transition-transform', 'hover:scale-105');
    
    // Change compress icon to expand
    const btn = e.currentTarget;
    if(btn) btn.innerHTML = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>';
    toast("Mode plein écran désactivé");
  }
};

window.filterProjectsByStatus = function(e) {
  const val = e.target.value;
  const card = document.getElementById('currentProjectCard');
  if (!card) return;
  
  const isFav = localStorage.getItem('currentProjectFavorite') === 'true';
  const isArchived = localStorage.getItem('currentProjectArchived') === 'true';
  
  let show = true;
  if (val === 'favorite' && !isFav) show = false;
  if (val === 'archived' && !isArchived) show = false;
  if (val !== 'archived' && isArchived) show = false; 
  
  if (val === 'all') {
    if (isArchived) show = false;
    else show = true;
  }
  
  if (show) {
    card.style.display = '';
  } else {
    card.style.display = 'none';
  }
};

// Global Search (Ctrl+K)
function initGlobalSearch() {
  const searchInput = $("globalSearchInput");
  const searchResults = $("globalSearchResults");
  if (!searchInput || !searchResults) return;

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = "";
      searchResults.classList.add("hidden");
      return;
    }

    const matchesProjects = [];
    const activeProjectName = "Signature email RAGT";
    if (activeProjectName.toLowerCase().includes(q)) {
      matchesProjects.push({
        id: "active",
        type: "active",
        name: activeProjectName,
        desc: "Projet actuel en cours de modification",
        action: () => {
          showView("home");
          const el = document.getElementById("currentProjectCard");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            el.classList.add("ring-4", "ring-yellow-400");
            setTimeout(() => el.classList.remove("ring-4", "ring-yellow-400"), 2000);
          }
        }
      });
    }

    const maxTemplates = 5;
    let countTemplates = 0;
    for (const t of (templates || [])) {
      if (countTemplates >= maxTemplates) break;
      if (t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) {
        matchesProjects.push({
          id: t.id,
          type: "template",
          name: t.name,
          desc: `Modèle de projet ${t.category}`,
          action: (id => () => openStudioWithTemplate(id))(t.id)
        });
        countTemplates++;
      }
    }

    const matchesPdfTools = [];
    const maxPdfTools = 5;
    let countPdfTools = 0;
    const allTools = allPdfTools();
    for (const tool of allTools) {
      if (countPdfTools >= maxPdfTools) break;
      if (tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || tool.categoryLabel.toLowerCase().includes(q)) {
        matchesPdfTools.push({
          id: tool.id,
          categoryId: tool.categoryId,
          categoryLabel: tool.categoryLabel,
          name: tool.name,
          desc: tool.description,
          action: (tId, catId) => () => {
            apply(() => {
              state.tools.selectedTool = tId;
              state.tools.selectedCategory = catId;
            }, false);
            showView("tools");
            renderTools();
          }
        });
        countPdfTools++;
      }
    }

    if (matchesProjects.length === 0 && matchesPdfTools.length === 0) {
      searchResults.innerHTML = `
        <div class="px-4 py-3 text-center text-xs text-slate-500">
          Aucun résultat pour "<strong>${esc(q)}</strong>"
        </div>
      `;
      searchResults.classList.remove("hidden");
      return;
    }

    let html = "";
    if (matchesProjects.length > 0) {
      html += `<div class="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">Projets & Modèles</div>`;
      for (const p of matchesProjects) {
        html += `
          <div class="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-100 last:border-none" data-search-action-id="p-${p.id}">
            <div class="flex items-center gap-3">
              <span class="text-base">${p.type === 'active' ? '📂' : '🎨'}</span>
              <div>
                <div class="text-xs font-bold text-slate-800">${esc(p.name)}</div>
                <div class="text-[10px] text-slate-400">${esc(p.desc)}</div>
              </div>
            </div>
            <span class="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold uppercase tracking-wider">${p.type === 'active' ? 'Actuel' : 'Modèle'}</span>
          </div>
        `;
      }
    }

    if (matchesPdfTools.length > 0) {
      html += `<div class="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100 mt-2">Outils PDF</div>`;
      for (const t of matchesPdfTools) {
        html += `
          <div class="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-100 last:border-none" data-search-action-id="t-${t.id}">
            <div class="flex items-center gap-3">
              <span class="text-base">📄</span>
              <div>
                <div class="text-xs font-bold text-slate-800">${esc(t.name)}</div>
                <div class="text-[10px] text-slate-400">${esc(t.desc)}</div>
              </div>
            </div>
            <span class="text-[9px] bg-[#f0f9ff] text-[#90b9d4] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">${esc(t.categoryLabel)}</span>
          </div>
        `;
      }
    }

    searchResults.innerHTML = html;
    searchResults.classList.remove("hidden");

    if (matchesProjects.length > 0) {
      for (const p of matchesProjects) {
        const el = searchResults.querySelector(`[data-search-action-id="p-${p.id}"]`);
        if (el) el.onclick = () => {
          p.action();
          searchResults.classList.add("hidden");
          searchInput.value = "";
        };
      }
    }
    if (matchesPdfTools.length > 0) {
      for (const t of matchesPdfTools) {
        const el = searchResults.querySelector(`[data-search-action-id="t-${t.id}"]`);
        if (el) el.onclick = () => {
          t.action(t.id, t.categoryId)();
          searchResults.classList.add("hidden");
          searchInput.value = "";
        };
      }
    }
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim()) {
      searchResults.classList.remove("hidden");
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      searchResults.classList.add("hidden");
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Alt+N for Notes
  if (e.altKey && e.key.toLowerCase() === 'n') {
    e.preventDefault();
    toggleProjectNotes();
  }
  // Alt+A for Archive
  if (e.altKey && e.key.toLowerCase() === 'a') {
    e.preventDefault();
    const card = document.getElementById('currentProjectCard');
    if (card && card.style.display !== 'none') {
      archiveCurrentProject(e);
    }
  }
});

// PDF Summary export
window.addEventListener("DOMContentLoaded", () => {
  if ($("exportSummaryPdfBtn")) {
    $("exportSummaryPdfBtn").onclick = async (e) => {
      e.preventDefault();
      try {
        if (typeof PDFLib === 'undefined') {
          toast("PDFLib non disponible.");
          return;
        }
        const { PDFDocument, rgb, StandardFonts } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const { width, height } = page.getSize();
        
        const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        
        page.drawText("Fiche de Synthèse du Projet", { x: 50, y: height - 60, size: 24, font: helveticaBold, color: rgb(0.1, 0.2, 0.4) });
        
        const date = new Date().toLocaleDateString("fr-FR");