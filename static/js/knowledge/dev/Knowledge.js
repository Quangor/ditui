(function(BaseModel,_){
	var template = document.querySelector("#knowledgeTemplate").innerHTML;
	var inputSearch = document.querySelector("#knowledgeSerach");
	var cancelSearchBtn = document.querySelector("#cancelSearchBtn");
	var knowledgeSerach = document.querySelector("#knowledgeSerach");
	var Quan = function(){
		
		this.show = function(container){
			if(/hide/.test(container.className)){
				container.className = container.className.replace("hide","");
				container.className = container.className.replace("  "," ");
			}
		};
		
		this.hide = function(container){
			if(!/hide/.test(container.className)){
				container.className += " hide";
			}
		};
	};
	var KnowledgeModel = function(){
		BaseModel.call(this);
		this.method = "knowledgeSerach";
		this.fields = {
			id : {
				type:"integer",
				mapping : "id"
			},
			title : {
				type : "string",
				defaultValue : "",
				mapping : "title"
			},
			time : {
				type : "date",
				defaultValue : "",
				mapping : "time"
			},
			author : {
				type : "string",
				defaultValie : "",
				mapping : "author"
			}	
		};
		
		this.getLocalStorage = function(){
			return localStorage[this.method];
		};
		
		this.setLocalStorage = function(data){
			localStorage[this.method] = data;
		};
		
		this.setDefaultMapping();
	};
	var ViewContaollerr = function(){
		var cateGorysContainer = document.querySelector("#cateGorysContainer");
		var knowledgeSearchListContainer = document.querySelector("#knowledgeSearchListContainer");
		var cancelBtn = document.querySelector("#cancelSearchBtn");
		var inputSearchWrapper = inputSearch.parentNode;
		var inputSearchInputLabel = inputSearch.previousElementSibling;
		var quan = new Quan();
		this.hideCateGorys = function(){
			quan.hide(cateGorysContainer);
			return this;
		};
	
		this.showCateGorys = function(){
			quan.show(cateGorysContainer);
			return this;
		};
		
		this.initSearchInputLabelStyle = function(){
			var left = (inputSearchWrapper.clientWidth - 70)/2;
			inputSearchInputLabel.style.left = left + 'px';
		};
		
		this.hideKnowledgeTitleLists = function(){
			quan.hide(knowledgeSearchListContainer);
			return this;
		};
		
		this.showKnowledgeTitleLists = function(){
			quan.show(knowledgeSearchListContainer);
			return this;
		};
		
		this.renderKnowledgeTitleLists = function(knowledges){
			knowledgeSearchListContainer.innerHTML =  _.template(template)({knowledges:knowledges}) ;
			return this;
		};
		
		this.emptyKnowledgeTitleLists = function(){
			knowledgeSearchListContainer.innerHTML = "";
			return this;
		};
		
		this.setInputFocusStyle = function(){
			if(!/focus/.test(inputSearchWrapper.className)){
				inputSearchWrapper.className += " focus";
			}
		};
		
		this.setInputBlurStyle = function(){
			if(/focus/.test(inputSearchWrapper.className)){
				inputSearchWrapper.className = inputSearchWrapper.className.replace("focus","");
				inputSearchWrapper.className = inputSearchWrapper.className.replace("  "," ");
			}
		};
		
		this.showCancelBtn = function(){
			quan.show(cancelBtn);
			return this;
		};
		
		this.hideCancelBtn = function(){
			quan.hide(cancelBtn);
			return this;
		};
		
		this.selectSearchVal = function(){
			knowledgeSerach.setSelectionRange(0, knowledgeSerach.value.length);
		};
		
		this.setSearchValue = function(val){
			knowledgeSerach.value= val;
		};
		
		this.resetSearchValue = function(){
			this.setSearchValue("");
		};
		
		
		
		this.initSearchInputLabelStyle();
	};
	var Knowledge = function(){
		model = new KnowledgeModel();
		var viewController = new ViewContaollerr();
		var me = this;
		
		var haveSearch = false;
		
		this.search = function(event){
			var evt = event||window.event;
			evt.preventDefault();
			var value = this.value;
			model.post({
				id : value
			},function(response){
				haveSearch = true;
				var knowledges= response.knowledges;
				if(knowledges){
					knowledges = model.dataMapping(knowledges,false);
					var storage = JSON.stringify({
						search:value,
						results : knowledges
					});
					model.setLocalStorage(storage);
					viewController.renderKnowledgeTitleLists(knowledges);
				}
			});
		};
		
		this.renderStorageSearch = function(){
			var localStorage = model.getLocalStorage();
			if(localStorage){
				localStorage = JSON.parse(localStorage);
				if(localStorage.results)
					viewController.renderKnowledgeTitleLists(localStorage.results);
			}
		};
		
		
		this.startSearch = function(){
			if(!haveSearch)
				me.renderStorageSearch();
			viewController.setInputFocusStyle();
			viewController.hideCateGorys();
			viewController.showKnowledgeTitleLists();
			viewController.showCancelBtn();
		};
		
		this.cancelSearch = function(){
			haveSearch = false;
			viewController.setInputBlurStyle();
			viewController.hideKnowledgeTitleLists();
			viewController.hideCancelBtn();
			viewController.showCateGorys();
			viewController.resetSearchValue();
			viewController.emptyKnowledgeTitleLists();
		};
		
		this.listenEvent = function(){
			inputSearch.addEventListener("search",this.search);
			inputSearch.addEventListener("focus",this.startSearch);
			cancelSearchBtn.addEventListener("click",this.cancelSearch);
		};
	};
	var knowledge = new Knowledge();
	knowledge.listenEvent();
})(BaseModel,_);
