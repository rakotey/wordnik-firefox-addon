let tabs = require("tabs");
require("chrome");
let J  = JSON.stringify
let DEBUG = true
let reportError = DEBUG ? console.log: function() {};

const {classes: Cc, interfaces: Ci, manager: Cm, utils: Cu} = Components;
Cu.import("resource://gre/modules/Services.jsm",this);
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

tabs.on('ready', function(tab){
	reportError("tab activated")
	let gBrowser = Services.wm.getMostRecentWindow('navigator:browser').gBrowser;
	let e = Services.search.defaultEngine;
	let type = Ci.nsISearchEngine.Data_XML;
	let origEngine = Services.search.getEngines();
	let engine = Services.search.getEngineByName("Wordnik");
	if (engine == null) {
		try{
			Services.search.addEngine("http://www.wordnik.com/opensearch.xml",
			1,
			"http://www.wordnik.com/favicon.png",
			false);
			Services.search.moveEngine(engine,1)
		
		}catch(ex){
			reportError(J(ex));
		}
	}
})
