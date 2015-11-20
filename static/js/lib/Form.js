var BaseForm = (function(validator,ajax){
	var formAjax =  (function(Validator){
		return new function FormAjax(){
			this.setPostConfig = function(modelObject,data,url){
				this.data = data;
				this.modelObject = modelObject;
				this.url = url;
			};
			
			this.validate = function(errorCallBack){
				var validateResult = validator.doValidate(this.modelObject, this.data);
				if(validateResult.isDirty){
					errorCallBack(validateResult.validateresult);
				}
				return !validateResult.isDirty;
			};
			
			/**
			 * @parameter postResponse is the function 	execute after post callback;  
			 * @parameter validateError is the function execute after fail to validate the form data;
			 * */
			this.postAfterValidate = function(postResponse,validateError){
				if(this.validate(validateError)){
					this.dopost(postResponse);
				};
			};
			
			this.dopost = function(datapostResponse,url,data){
				this.post(url||this.url,this.data,datapostResponse);
			};
			
			this.post = function(url,data,callback){
				ajax.post(url,data,function(response){
					if('string' == typeof response){
						response = JSON.parse(response);
					}
					if(callback && 'function' == typeof callback){
						callback(response);
					}
				});
			};
		};
	})(Validator);

	return function BaseForm (){
		
		this.data = {};
		this.setName = function(){
			for(var el in this.fields){
				if(this.fields && this.fields[el] && !this.fields[el].name){
					this.fields[el].name = el;
				}
			}
		};
		
		this.collectData = function(){
			var data = {};
			for(var el in this.fields){
				var elVal = document.querySelector("#" + this.fields[el].name).value || "";
				data[el] = elVal;
			}
			this.data =  data;
		};
		
		
		this.getValidateFailMsg = function(result){
			var errMsg = [];
			for(var el in result){
				for(var element in result[el]){
					if(result[el][element]){
						errMsg.push(this.fields[el].validateFail[element]);
					}
				}
			}
			return errMsg;
		};
	
		/**
		 * @parameter postResponse is the function 	execute after post callback;  
		 * @parameter validateError is the function execute after fail to validate the form data;
		 * */
		this.beforePost = function(){
			this.setName();
			this.collectData();
			formAjax.setPostConfig(this,this.data,this.method);
		};
		
		this.post = function(postResponse,validateError){
			this.beforePost();
			formAjax.postAfterValidate(postResponse,validateError);
		};
	};
})(new Validator(),new Ajax());
