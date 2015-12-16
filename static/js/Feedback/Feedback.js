(function(BaseForm){
	var Form = (function(BaseForm,model){
		return function FeedbackForm(){
			BaseForm.call(this);
			this.fields = {
				feedbackText : {
					type : 'string',
					name:"feedbackText",
					validators : ['presence'],
					validateFail:{
						presence : "请用简洁明了的文字说明用一下您要反馈的意见"
					}
				},
				feedbackTextImg1 : {
					type : 'string',
					name : "feedbackTextImg1"
				},
				feedbackTextImg2 : {
					type : 'string',
					name : "feedbackTextImg2"
				},
				feedbackTextImg3 : {
					type : 'string',
					name : "feedbackTextImg3"
				}
			};
			
			this.formElement = document.querySelector("#feedbackForm");
			
			this.setFeedbackTextImgVal = function(index,value){
				this["setFeedbackTextImg"+(index+1)+"Val"](value);
			};
			
			this.setFeedbackTextImg1Val = function(val){
				document.querySelector("#feedbackTextImg1").value = val;
			};
			
			this.setFeedbackTextImg2Val = function(val){
				document.querySelector("#feedbackTextImg2").value = val;
			};
			
			this.setFeedbackTextImg3Val = function(val){
				document.querySelector("#feedbackTextImg3").value = val;
			};
			
			this.setMethod = function(method){
				this.method = method;
			};
			
			this.method = "feedbackSubmit";
		};
	})(BaseForm);
	
	var FileInputContainer = function(){
		var me = this;
		this.container = document.querySelector("#feedbackImgContainer");
		this.containerLists = this.container.children;
		this.inputfiles = this.container.getElementsByTagName("input");
		this.labelImages = this.container.getElementsByTagName("img");
		this.setContainerListsandLabelSize = function(){
			var lists = this.containerLists;
			for(var i=0 ; i<lists.length;i++){
				var listWidth = lists[i].clientWidth + 'px';
				lists[i].style.height = listWidth;
				var label = lists[i].getElementsByTagName("label")[0];
				label.style.height = listWidth;
				label.style.width = listWidth;
			}
		};
		
		this.resetImageView = function(src,img){
			
		};
		
		this.init = function(){
			me.setContainerListsandLabelSize();
			window.addEventListener("resize",function(event){
				var evt = event || window.event;
				me.setContainerListsandLabelSize();
			});
		};
	};
	
	var ViewController = function(){
		var me = this;
		this.fileInputContainer = new FileInputContainer();
		
		this.getFormAction = function(){
			return document.querySelector("#feedbackFor").action;
		};
		
		this.renderLoadResult = function(index,src){
			this.fileInputContainer.labelImages[index].src = src;
		};
		
		this.focusFeedbackText = function(){
			document.querySelector("#feedbackText").focus();
		};
		
		this.showLoading = function(){
			
		};
		
		this.closeLoading = function(){
			
		};
		
		this.init = function(){
			this.fileInputContainer.init();
		};
	};
	var Feedback = function(){
		var me = this;
		var viewController = new ViewController();
		var formAction = viewController.getFormAction();
		var form = new Form();
		form.setMethod(formAction);
		this.resize = function(inputfile,event){
			var index = inputfile.index;
			viewController.showLoading(index);
		    var newLrz = lrz(inputfile.files[0], {
		        width: 800
		    }).then(function (rst) {
		    	viewController.renderLoadResult(index,rst.base64);
		    	form.setFeedbackTextImgVal(index,rst.base64);
	            return rst;
	        }).catch(function (err){
            	alert(err);
        	}).always(function () {
		    	viewController.closeLoading(index);
        	});
		};
		
		this.closePage = function(){
			
		};
		
		this.submitSucess = function(response){
			if("ok" == response.isOk){
				alert("提交成功，谢谢反馈");
				me.closePage();
			}else{
				alert(response.errMsg);
			}
		};
		
		this.validatorError = function(result){
			var errMsg = form.getValidateFailMsg(result).join(" , ");
			alert(errMsg);
			viewController.focusFeedbackText();
		};
		
		this.submitFeedBack = function(event){
			form.post(me.submitSucess,me.validatorError);
		};
			
		this.init = function(){
			viewController.init();
			var inputFiles =  viewController.fileInputContainer.inputfiles;
			for(var i =0;i<inputFiles.length;i++){
				inputFiles[i].index = i;
				inputFiles[i].addEventListener("change",function(event){
					var evt = event || window.event;
					me.resize(this,event);
				});
			}
			
			document.querySelector("#feedbackFormBtn").onclick = function(event){
				me.submitFeedBack(event||window.event);
			};
		};
	};
	
	var feedback = new Feedback();
	feedback.init();
})(BaseForm);
