var BaseModel = (function(ajax){
	return 	function(){
		var me = this;
		
		this.datas = [];
		
		this.addRecordsIndex = [];	
		
		this.setDefaultMapping = function(){
			var fields = this.fields; 
			for(var element in fields){
				if(!fields[element].mapping){
					fields[element].mapping = element;
				}
			}
		};
		
		/**
		 * @parameter isPost 提交的时候设置为true 返回设置为false
		 * **/
		this.dataMapping = function(datas,isPost){
			var records = [];
			for(var i=0,len =  datas.length;i<len;i++){
				var record = {};
				var fields = this.fields;
				for(var element in this.fields){
					
					var data = isPost ? datas[i][fields[element].element] : datas[i][fields[element].mapping];
					if(undefined === data){
						data = this.fields[element].defaultValue||(this.fields[element].type.toLowerCase() == "number" || "integer" || "float" || "double"?0:"");
					}
					if(isPost)
						record[this.fields[element].mapping] = data;
					else
						record[element] = data;
				}
				records.push(record);
			};
			return records;
		};
		
		
		
		this.post = function(data,callback){
			url = this.method;
			ajax.post(url,data,function(response){
				if(callback && 'function' == typeof callback){
					callback(response);
				}
			});
		};
		
	};
})(new Ajax());
