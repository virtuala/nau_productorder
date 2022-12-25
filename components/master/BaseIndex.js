import common from "@/asset/js/common.js";

export default {
	name: 'BaseIndex',
	data() {
		return {
			title: '用户登录',
			
			user_token:"",
			user_id:"",
			user_name:"",
			user_numcode:"",
			user_role:"",
			user_email:"",
			user_mobile:"",
			user_powermenuuser:"",

			//
			sModule: "",
			sModel: "",
			sParameter: "",
			sPowerSign: "",

			//列表框
			tableinfo: ["", "", ""],
			tablegroup: ["", "", ""],
			list: null,
			list_header: [],
			list_page_default: [1, 0, 20, 0],
			list_page: [1, 0, 20, 0],
			list_order: ["", 2],
			total: 0,
			listLoading: true,
			listLoadingConcat: false, // 是否追加式翻页，此为运行时值，无需手动配置

			list_selected: [],
			list_deleteids: [], //要删除的IDS
			list_edit_row: [], //正在编辑的行数据，是list里的一部分
			list_row_parent: [], //正在编辑的行数据的上一级，是list里的一部分
			list_chooseid: 0, //list中选中的ID

			//列表字段（一般用于树形表格）
			list_c_ID: "ID",
			list_c_Parid: "Parid",
			list_c_Children: "children",

			//新增修改框
			sUser: {},
			sIndex: 0,
			sMainID: 0,
			sValuesAdd: [],
			sValuesModify: [],
			dialogAddVisible: false,
			dialogModifyVisible: false,
			dialogViewVisible: false,

			//高级查询
			dialogSearchHighVisible: false,

			//导入框
			dialogImportVisible: false,
			dialogImportAction: "/api/auto/fileupload",
			dialogImportFileName: "",
			dialogImportViewVisible: false,
			list_selected_importview: [],
			list_import: [],

			//界面描述表
			uidesc_origin: {},
			uidesc_search: [],
			uidesc_search_high: [],
			uidesc_list: [],
			uidesc_add: [],
			uidesc_normal: [],
			uidesc_import: [],
			uidesc_isshow_search: true,
			uidesc_isshow_add: true,
			uidesc_isshow_delete: true,
			uidesc_isshow_import: true,
			uidesc_isshow_export: true,
			uidesc_isshow_print: true,
			uidesc_isshow_design: true,

			//左侧树分类

			//权限配置
			dialogEditPowerVisible: false,
			EditPowerGroupid: 0,
			EditPowerGroupOption: [],
			EditPowerCheckboxNormalHeader: false,
			EditPowerCheckboxNormalChooseId: [],
			EditPowerCheckboxNormalId: [],
			EditPowerCheckboxNormal: [],

			
			
			endValue:""
		}
	},
	onLoad() {
		
	},
	/*
	//显示或返回页面时刷新
	onShow(options) {
		this.Mescroll_OnDownCallback();
	},

	//新增按钮
	onNavigationBarButtonTap(e) {
		uni.navigateTo({ url: "/pages/"+this.sModel+"/normal?id=0" });
	},

	*/
	methods: {
		OnInitial:function(){
			this.getUserinfo();
			this.OnInitialSize();
			this.getList();
		},
		OnInitialSize:function(){
			/*
			var tmpInt=0;
			if(document.getElementById("MainListContainer")==undefined){
				return;
			}
			tmpInt=common.getScreenHeight()-42;
			document.getElementById("MainListContainer").style.height=tmpInt+"px";

			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					//获取屏幕的高度
					that.height_pop = res.windowHeight-84;
					//获取屏幕的宽度
					that.height_pop2 = res.windowHeight-84-42;
				}
			});

			*/
		},
		getList:function(pType,pIsSameName,pIsHighSearch){
			
			var tmpUrlSearch=this.OnSearchMakeUrl(pType,pIsSameName,pIsHighSearch);

			uni.request({
				/*
				url: common.makeInterface2("/api/auto/getdata/"+this.sModel+"/null/"+this.sModel+"?"+tmpUrlSearch),
				*/
				url: common.makeInterface2("/api/"+this.sModule+"/"+this.sModel+"/list?"+tmpUrlSearch),
				method: 'GET',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							//如果是导出
							/*
							if(this.OnSearchMakeExportAction(pType,response)){
								return;
							}
							*/

							//加载DATA
							/*
							this.list = response.data.data.data;
							this.list_page = response.data.data.page;
							this.total = response.data.data.page[3];
							*/

							//加载DATA（上拉下拉）
							if(this.listLoadingConcat){
								this.list = this.list.concat(response.data.data.data);
							}else{
								this.list = response.data.data.data;
							}
							this.list_page = response.data.data.page;
							this.total = response.data.data.page[3];
							
							//是否有下一页判断
							if(this.list_page[0]>=this.list_page[1]){
								this.mescroll.showNoMore();
							}
							this.mescroll.endSuccess();

							//加载通用配置
							this.tableinfo=response.data.data.tableinfo[0];
							if(this.uidesc_list.length<=0){
								this.uidesc_origin = response.data.data.uidata
								this.uidesc_search = this.uidesc_origin.search
								this.uidesc_search_high = this.uidesc_origin.search_high
								this.uidesc_list = this.uidesc_origin.list
								this.uidesc_add = this.uidesc_origin.add
								this.uidesc_normal = this.uidesc_origin.normal
							}
						}
					} else {
						this.mescroll.endErr();
						return uni.showToast({ title:"请求失败" });
					}
				},
				fail: (err)=> {
					return uni.showToast({ title:"请求接口失败" });
				},
			});
			
			console.log("getList");
		},
    OnSearch: function () {
      this.list_order = ["", 2];
      this.list_page = this.list_page_default;
      this.getList(0, 0, 0)
    },
    OnSearchHigh: function () {
      this.list_order = ["", 2];
      this.list_page = this.list_page_default;
      this.getList(0, 0, 1)
    },
    OnSearchExecute: function (pIsSameName, pIsHighSearch) {
      if (pIsHighSearch == 1) {
        this.dialogSearchHighVisible = true;
      } else {
        this.list_order = ["", 2];
        this.list_page = this.list_page_default;
        this.getList(0, pIsSameName, pIsHighSearch)
      }
    },

		/* -- #comment#上拉下拉刷新方法# -- */
		/*
		//以下内容为控件固定方法，直接复制作用即可
		mescrollInit:function(pMescroll) {
			this.mescroll = pMescroll;
		},
		downCallback:function(){
			this.Mescroll_OnDownCallback();
			return this.mescroll;
		},
		upCallback:function(page) {
			this.Mescroll_OnUpCallback();
		},
		*/

		Mescroll_OnDownCallback: function (){
			this.listLoadingConcat=false;
			this.OnSearch();
			return;
		},
		Mescroll_OnUpCallback: function (){
			if(this.list_page[3]>0){
				this.listLoadingConcat=true;
				this.list_page[0]++;
			}
			this.getList(0,0,0);
			return;
		},

		/* -- #comment#增删改方法# -- */
		OnFormSet: function(pParameter){
	    var Coun0 = 0;
	    var tmpStrParamter=pParameter;
	    if(tmpStrParamter=="null"){
	    	tmpStrParamter="";
	    }
	    if(tmpStrParamter.length>0){
	    	tmpStrParamter=tmpStrParamter+"_";
	    }
			if(this.sMainID==0){
				this.uidesc_add = this.uidesc_origin[tmpStrParamter+"add"];
				
				while (this.uidesc_add.length > Coun0) {
					this.uidesc_add[Coun0]["Value"] = "";
					this.uidesc_add[Coun0] = this.getValueShow(this.uidesc_add[Coun0]);
					Coun0++;
				}
				
			}else{
				this.uidesc_normal = this.uidesc_origin[tmpStrParamter+"normal"];
				
				this.uidesc_normal = this.FillDescValueFromData(this.uidesc_normal, this.normal, 0);
				/*
				this.sMainID = this.normal[this.tableinfo[1] + "ID"];
				*/
			}
		},
		OnFormSubmit: function(){
	    var Coun0 = 0;
			if(this.sMainID==0){
	      this.OnAdd();
			}else{
	      this.OnModify();
			}
		},

		//新增按钮
		onNavigationBarButtonTap(e) {
			uni.navigateTo({ url: "/pages/crmcustomers/normal" });
		},
		
    OnAddShow: function () {
      var Coun0 = 0;
      while (this.uidesc_add.length > Coun0) {
        this.uidesc_add[Coun0]["Value"] = "";
        this.uidesc_add[Coun0] = this.getValueShow(this.uidesc_add[Coun0]);
        Coun0++;
      }
      this.dialogAddVisible = true;
    },
    OnAddMakeForm: function () {
      var tmpDataSubmit = {};
      var Row0;
      var Coun0, Coun1;
      var tmpStr;
      Coun0 = 0;
      while (this.uidesc_add.length > Coun0) {
        Row0 = this.uidesc_add[Coun0];

        Row0 = this.setValueShowToValue(Row0);
        /*
				if(Row0["ControlType"]=="checkbox"){
					tmpStr="";
					Coun1=0;
					while(Row0["Value"].length>Coun1){
						tmpStr+=Row0["Value"][Coun1]+",";
						Coun1++;
					}
				}
        tmpStr = encodeURI(Row0["Value"]);
				*/
        tmpStr = Row0["Value"];
        /*
        tmpDataSubmit.append(Row0["DbColumn"], tmpStr);
        */
        tmpDataSubmit[Row0["DbColumn"]]=tmpStr;
        Coun0++;
      }
      Coun0 = 0;
      while (this.sValuesAdd.length > Coun0) {
        Row0 = this.sValuesAdd[Coun0];
        if (Row0["value"] != undefined) {
        	/*
          tmpDataSubmit.append(Row0["key"], encodeURI(Row0["value"]));
          tmpDataSubmit[Row0["key"]]=encodeURI(Row0["value"]);
          */
			tmpDataSubmit[Row0["key"]]=Row0["value"];
        }
        Coun0++;
      }
      return tmpDataSubmit;
    },
    OnAdd: function () {
      if (!this.OnCheckAndFilter("add_form", this.uidesc_add)) {
        return;
      }
      var tmpDataSubmit = this.OnAddMakeForm();
			uni.request({
				/*
				url: common.makeInterface2("/api/auto/adddata/" + this.sModel + "/null/" + this.sModel + "?"),
				*/
				url: common.makeInterface2("/api/"+this.sModule+"/" + this.sModel + "/add?"),
				method: 'POST',
				data: tmpDataSubmit,
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							uni.navigateBack();
							return uni.showToast({ title:"保存成功" });
						}else{
							return uni.showToast({ title:response.data.message,icon: 'none' });
						}
					} else {
						return uni.showToast({ title:"请求失败" });
					}
				},
				fail: (err)=> {
					return uni.showToast({ title:"请求接口失败" });
				},
			});
    },
    OnViewShow: function (pIndex) {
      var Coun0 = 0;
      this.list_edit_row = this.list[pIndex];
      this.uidesc_normal = this.FillDescValueFromData(this.uidesc_normal, this.list_edit_row, 0);
      this.sIndex = pIndex;
      this.sMainID = this.list[pIndex][this.tableinfo[1] + "ID"];
      this.dialogViewVisible = true;
    },
    OnModifyShow: function (pIndex) {
      var Coun0;
      this.list_edit_row = this.list[pIndex];
      this.uidesc_normal = this.FillDescValueFromData(this.uidesc_normal, this.list_edit_row, 0);
      this.sIndex = pIndex;
      this.sMainID = this.list_edit_row[this.tableinfo[1] + "ID"];
      this.dialogModifyVisible = true;
    },
    OnModifyMakeForm: function () {
      var tmpDataSubmit = {};
      var Row0;
      var Coun0, Coun1;
      var tmpStr;
      Coun0 = 0;
      while (this.uidesc_normal.length > Coun0) {
        Row0 = this.uidesc_normal[Coun0];

        Row0 = this.setValueShowToValue(Row0);
        /*
				if(Row0["ControlType"]=="checkbox"){
					tmpStr="";
					Coun1=0;
					while(Row0["Value"].length>Coun1){
						tmpStr+=Row0["Value"][Coun1]+",";
						Coun1++;
					}
				}
        tmpStr = encodeURI(Row0["Value"]);
				*/
        tmpStr = Row0["Value"];
        /*
        tmpDataSubmit.append(Row0["DbColumn"], tmpStr);
        */
        tmpDataSubmit[Row0["DbColumn"]]=tmpStr;
        Coun0++;
      }
      Coun0 = 0;
      while (this.sValuesModify.length > Coun0) {
        Row0 = this.sValuesModify[Coun0];
        if (Row0["value"] != undefined) {
        	/*
          tmpDataSubmit.append(Row0["key"], encodeURI(Row0["value"]));
          tmpDataSubmit[Row0["key"]]=encodeURI(Row0["value"]);
          */
			tmpDataSubmit[Row0["key"]]=Row0["value"];
        }
        Coun0++;
      }
      return tmpDataSubmit;
    },
    OnModify: function () {
      if (!this.OnCheckAndFilter("normal_form", this.uidesc_normal)) {
        return;
      }
      var tmpDataSubmit = this.OnModifyMakeForm();
			uni.request({
				/*
				url: common.makeInterface2("/api/auto/modifydata/" + this.sModel + "/null/" + this.sModel + "?ids=" + this.sMainID),
				*/
				url: common.makeInterface2("/api/"+this.sModule+"/"+this.sModel+"/modify?ids=" + this.sMainID),
				method: 'POST',
				data: tmpDataSubmit,
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							uni.navigateBack();
							return uni.showToast({ title:"保存成功" });
						}else{
							return uni.showToast({ title:response.data.message,icon: 'none' });
						}
					} else {
						return uni.showToast({ title:"请求失败" });
					}
				},
				fail: (err)=> {
					return uni.showToast({ title:"请求接口失败" });
				},
			});
    },
    OnModifyNormal: function () {
      var Coun0;
      var Row0;
      var tmpDataSubmit = this.OnModifyMakeForm();
			uni.request({
				/*
				url: common.makeInterface2("/api/auto/modifydata/" + this.sModel + "/null/" + this.sModel + "?ids=" + this.sMainID),
				*/
				url: common.makeInterface2("/api/"+this.sModule+"/"+this.sModel+"/modify?ids=" + this.sMainID),
				method: 'POST',
				data: tmpDataSubmit,
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
				      this.uidesc_normal = this.FillDescValueFromData(this.uidesc_normal, this.normal, 0);
							return uni.showToast({ title:"保存成功" });
						}else{
							return uni.showToast({ title:response.data.message,icon: 'none' });
						}
					} else {
						return uni.showToast({ title:"请求失败" });
					}
				},
				fail: (err)=> {
					return uni.showToast({ title:"请求接口失败" });
				},
			});
    },
    OnModify_SetList: function () {
      var Coun0;
      var Row0;
      Coun0 = 0;
      while (this.uidesc_normal.length > Coun0) {
        Row0 = this.uidesc_normal[Coun0];
        if (this.list_edit_row[Row0["DbColumn"]] != undefined) {
          this.list_edit_row[Row0["DbColumn"]] = Row0["Value"];
        }
        if (this.uidesc_normal[Coun0]["ControlType"] == "select" || this.uidesc_normal[Coun0]["ControlType"] == "select_label" || this.uidesc_normal[Coun0]["ControlType"] == "select_multi" || this.uidesc_normal[Coun0]["ControlType"] == "switch" || this.uidesc_normal[Coun0]["ControlType"] == "checkbox") {
          Row0 = this.getValueShow(Row0);
          this.list_edit_row[Row0["DbColumn"] + "_Text"] = Row0["ValueShow"];
        }
        if (this.uidesc_normal[Coun0]["ControlType"] == "pxd") {
          this.uidesc_normal[Coun0]["Value"] = "";
        }
        Coun0++;
      }
    },
    OnGetIds: function (pIndex, pType) {
      var Coun0;
      var tmpIds = [];
      if (pIndex < 0) {
        if (pType == 1) {
          Coun0 = 0;
          while (this.list_selected.length > Coun0) {
            tmpIds[tmpIds.length] = this.list_selected[Coun0][this.tableinfo[1] + "ID"];
            Coun0++;
          }
        } else {
          Coun0 = 0;
          while (this.list.length > Coun0) {
            tmpIds[tmpIds.length] = this.list[Coun0][this.tableinfo[1] + "ID"];
            Coun0++;
          }
        }
      } else {
        tmpIds[tmpIds.length] = this.list[pIndex][this.tableinfo[1] + "ID"];
      }
      return tmpIds;
    },
    OnDeleteConfrimSingle: function () {
			uni.showModal({
				title: '提示',
				content: '此操作将永久删除该文件, 是否继续?',
				confirmText: "确定",
				cancelText: "取消",
				success: function (res) {
					if (res.confirm) {
						var that=this;
console.log(that);
						that.OnDelete([that.sMainID]);
						return;
					} else if (res.cancel) {
						return;
					}
				}.bind(this)
			});
    },
    OnDeleteConfrim: function (pIndex, pType) {
      var tmpIds = this.OnGetIds(pIndex, pType);
      this.OnDeleteConfrimFromIds(tmpIds, pType);
    },
    OnDeleteConfrimFromIds: function (tmpIds, pType) {
      if (tmpIds.length <= 0) {
        return uni.showToast({ title:"请选择要删除的数据" });
      }
			uni.showModal({
				title: '提示',
				content: '此操作将永久删除该文件, 是否继续?',
				confirmText: "确定",
				cancelText: "取消",
				success: function (res) {
					if (res.confirm) {
						var that=this;
						that.OnDelete(tmpIds);
						return;
					} else if (res.cancel) {
						return;
					}
				}.bind(this)
			});
    },
    OnDelete: function (pIds) {
      var Coun0;
      let tmpStrIds = "";
      Coun0 = 0;
      while (pIds.length > Coun0) {
        if (tmpStrIds.length > 0) {
          tmpStrIds += ",";
        }
        tmpStrIds += pIds[Coun0];
        Coun0++;
      }
			uni.request({
				/*
				url: common.makeInterface2("/api/auto/deleterealdata/" + this.sModel + "?ids=" + tmpStrIds),
				*/
				url: common.makeInterface2("/api/"+this.sModule+"/" + this.sModel + "/delete?ids=" + tmpStrIds),
				method: 'GET',
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: (response) => {
					if(response.statusCode == 200 || response.statusCode == 201) {
						if(response.data.code=="SUCCESS"){
							uni.navigateBack();
							return uni.showToast({ title:"删除成功" });
						}else{
							return uni.showToast({ title:response.data.message,icon: 'none' });
						}
					} else {
						return uni.showToast({ title:"请求失败" });
					}
				},
				fail: (err)=> {
					return uni.showToast({ title:"请求接口失败" });
				},
			});
    },
    /* -- ------ #comment#通用方法# ------ -- */
		OnSearchMakeUrl: function (pType, pIsSameName, pIsHighSearch) {
			var Row0;
			var Coun0;
			var tmpUrlSearch = "";
			Coun0 = 0;
			if (pIsHighSearch == 1) {
				while (this.uidesc_search_high.length > Coun0) {
					Row0 = this.setValueShowToValue(this.uidesc_search_high[Coun0]);
					tmpUrlSearch += Row0["DbColumn"] + "=" + encodeURI(Row0["Value"]) + "&";
					Coun0++;
				}
				tmpUrlSearch += "&searchhigh=" + pIsHighSearch;
			} else {
				while (this.uidesc_search.length > Coun0) {
					Row0 = this.setValueShowToValue(this.uidesc_search[Coun0]);
					tmpUrlSearch += Row0["DbColumn"] + "=" + encodeURI(Row0["Value"]) + "&";
					Coun0++;
				}
			}
			if (pIsSameName > 0) {
				tmpUrlSearch += "&samename=" + pIsSameName;
			}
			if (this.uidesc_list.length > 0 && this.list_order[0] == "") {
				this.list_order[0] = this.uidesc_list[0]["DbColumn"];
			}
			tmpUrlSearch += "&page=" + this.list_page[0] + "," + this.list_page[1] + "," + this.list_page[2] + "," + this.list_page[3];
			if (this.list_order[0] != "") {
				tmpUrlSearch += "&order=" + this.list_order[0] + "," + this.list_order[1];
			}
			if (pType == 1 || pType == 2 || pType == 3 || pType == 4 || pType == 5 || pType == 6 || pType == 7 || pType == 99) {
				tmpUrlSearch += "&export=" + pType;
			}

			return tmpUrlSearch;
		},
		
		
		
		
		
		FillDescValueFromData: function (pUiDesc, pData, pType) {
		  var Coun0;
		  Coun0 = 0;
		  while (pUiDesc.length > Coun0) {
			if (pData[pUiDesc[Coun0]["DbColumn"]] != undefined) {
			  if (pUiDesc[Coun0]["ControlType"] == "pxd") {
				pUiDesc[Coun0]["Value"] = "";
			  } else if (pUiDesc[Coun0]["ControlType"] == "select" || pUiDesc[Coun0]["ControlType"] == "select_label") {
				pUiDesc[Coun0]["Value"] = pData[pUiDesc[Coun0]["DbColumn"]];
				pUiDesc[Coun0] = this.getValueShow(pUiDesc[Coun0]);
			  } else if (pUiDesc[Coun0]["ControlType"] == "select_multi") {
				pUiDesc[Coun0]["Value"] = pData[pUiDesc[Coun0]["DbColumn"]];
				console.log(pUiDesc[Coun0]["DbColumn"] + ":" + pUiDesc[Coun0]["Value"]);
				pUiDesc[Coun0] = this.getValueShow(pUiDesc[Coun0]);
				console.log(pUiDesc[Coun0]);
			  } else if (pUiDesc[Coun0]["ControlType"] == "switch") {
					/*
					if(pData[pUiDesc[Coun0]["DbColumn"]]=="1"){
						pUiDesc[Coun0]["Value"]=true;
					}else{
						pUiDesc[Coun0]["Value"]=false;
					}
					*/
					pUiDesc[Coun0]["Value"] = pData[pUiDesc[Coun0]["DbColumn"]];
					pUiDesc[Coun0] = this.getValueShow(pUiDesc[Coun0]);
			  } else if (pUiDesc[Coun0]["ControlType"] == "checkbox") {
					/*
					if(pData[pUiDesc[Coun0]["DbColumn"]] instanceof Array==false){
						pUiDesc[Coun0]["Value"]=pData[pUiDesc[Coun0]["DbColumn"]].split(",");
					}else{
						pUiDesc[Coun0]["Value"]=pData[pUiDesc[Coun0]["DbColumn"]];
					}
					*/
					pUiDesc[Coun0]["Value"] = pData[pUiDesc[Coun0]["DbColumn"]];
					pUiDesc[Coun0] = this.getValueShow(pUiDesc[Coun0]);
			  } else {
					pUiDesc[Coun0]["Value"] = pData[pUiDesc[Coun0]["DbColumn"]];
			  }
			}
			Coun0++;
		  }
		  return pUiDesc;
		},
		setValueShowToValue: function (pRow) {
		  var Coun0;
		  var tmpAr0;
		  var tmpValue;
		  if (pRow["ControlType"] == "select" || pRow["ControlType"] == "select_label" || pRow["ControlType"] == "radio") {
		  } else if (pRow["ControlType"] == "switch") {
			pRow["Value"] = "0";
			if (pRow["ValueShow"]) {
			  pRow["Value"] = "1";
			}
		  } else if (pRow["ControlType"] == "checkbox") {
			pRow["Value"] = "";
			Coun0 = 0;
			while (pRow["Options"].length > Coun0) {
			  if (this.In_array(pRow["Options"][Coun0]["Value"], pRow["ValueShowAr"])) {
				pRow["Value"] += pRow["Options"][Coun0]["Value"] + ",";
				pRow["ValueShow"] += pRow["Options"][Coun0]["Text"] + ",";
			  }
			  Coun0++;
			}
		  } else if (pRow["ControlType"] == "select_multi") {
			pRow["Value"] = "";
			Coun0 = 0;
			while (pRow["Options"].length > Coun0) {
			  if (this.In_array(pRow["Options"][Coun0]["Value"], pRow["ValueShowAr"])) {
				pRow["Value"] += pRow["Options"][Coun0]["Value"] + ",";
				pRow["ValueShow"] += pRow["Options"][Coun0]["Text"] + ",";
			  }
			  Coun0++;
			}
			console.log(pRow);
		  }
		  return pRow;
		},
		getValueShow: function (pRow) {
		  var Coun0;
		  var tmpAr0;
		  if (pRow["ControlType"] == "select" || pRow["ControlType"] == "select_label" || pRow["ControlType"] == "radio") {
			pRow["ValueShow"] = "";
			Coun0 = 0;
			while (pRow["Options"].length > Coun0) {
			  if (pRow["Options"][Coun0]["Value"] == pRow["Value"]) {
				pRow["ValueShow"] = pRow["Options"][Coun0]["Text"];
			  }
			  Coun0++;
			}
		  } else if (pRow["ControlType"] == "switch") {
			pRow["ValueShow"] = false;
			if (pRow["Value"] == "1") {
			  pRow["ValueShow"] = true;
			}
		  } else if (pRow["ControlType"] == "checkbox") {
			tmpAr0 = pRow["Value"].split(",");
			pRow["ValueShow"] = "";
			pRow["ValueShowAr"] = [];
			Coun0 = 0;
			while (pRow["Options"].length > Coun0) {
			  if (this.In_array(pRow["Options"][Coun0]["Value"], tmpAr0)) {
				if (pRow["ValueShow"].length > 0) {
				  pRow["ValueShow"] += ",";
				}
				pRow["ValueShow"] += pRow["Options"][Coun0]["Text"];
				pRow["ValueShowAr"][pRow["ValueShowAr"].length] = pRow["Options"][Coun0]["Text"];
			  }
			  Coun0++;
			}
			//pRow["ValueShowAr"]=tmpAr0;
		  } else if (pRow["ControlType"] == "select_multi") {
			tmpAr0 = pRow["Value"].split(",");
			pRow["ValueShow"] = "";
			pRow["ValueShowAr"] = [];
			Coun0 = 0;
			while (pRow["Options"].length > Coun0) {
			  if (this.In_array(pRow["Options"][Coun0]["Value"], tmpAr0)) {
				if (pRow["ValueShow"].length > 0) {
				  pRow["ValueShow"] += ",";
				}
				pRow["ValueShow"] += pRow["Options"][Coun0]["Text"];
				pRow["ValueShowAr"][pRow["ValueShowAr"].length] = pRow["Options"][Coun0]["Text"];
			  }
			  Coun0++;
			}
			//pRow["ValueShowAr"]=tmpAr0;
		  }
		  return pRow;
		},

    OnCheckAndFilter: function (pFormName, pUiDesc) {
      var tmpFlagHasError = 0, tmpFlagCheckHasError = 0;
      var CounDesc, CounFilter;
      var RowDesc, RowFilter;
      var tmpArFilter;
      var tmpValue;

      CounDesc = 0;
      while (pUiDesc.length > CounDesc) {
        RowDesc = pUiDesc[CounDesc];
        tmpValue = pUiDesc[CounDesc]["Value"];

        //DataFilter
        CounFilter = 0;
        while (RowDesc["DataFilter"].length > CounFilter) {
          RowFilter = RowDesc["DataFilter"][CounFilter];
          tmpArFilter = RowFilter["FilterOption"];
          if (tmpArFilter instanceof Array == false) {
            tmpArFilter = tmpArFilter.split(",");
          }

          if (this.In_array("1", tmpArFilter)) {
            tmpValue = tmpValue;
          }
          if (this.In_array("2", tmpArFilter)) {
            tmpValue = parseInt(tmpValue);
            if (tmpValue == undefined) {
              tmpValue = 0;
            }
            if (isNaN(tmpValue)) {
              tmpValue = 0;
            }
          }
          if (this.In_array("4", tmpArFilter)) {
            tmpValue = tmpValue.substring(0, RowFilter["FilterLengthBlock"]);
          }

          CounFilter++;
        }
        pUiDesc[CounDesc]["Value"] = tmpValue;

        //DataCheck
        CounFilter = 0;
        while (RowDesc["DataCheck"].length > CounFilter) {
          RowFilter = RowDesc["DataCheck"][CounFilter];
          tmpArFilter = RowFilter["CheckOption"];
          if (tmpArFilter instanceof Array == false) {
            tmpArFilter = tmpArFilter.split(",");
          }
          tmpFlagCheckHasError = 0;

          if (this.In_array("1", tmpArFilter)) {
            if (tmpValue == "") {
              tmpFlagCheckHasError = 1;
            }
          }
          if (this.In_array("2", tmpArFilter)) {
            if (tmpValue.length < RowFilter["CheckLengthMin"] || RowFilter["CheckLengthMax"] < tmpValue.length) {
              tmpFlagCheckHasError = 1;
            }
          }

          if (tmpFlagCheckHasError == 1) {
            this.$refs[pFormName].fields[CounDesc].validateMessage = RowFilter["ShowAlert"];
            this.$refs[pFormName].fields[CounDesc].validateState = 'error';
            tmpFlagHasError = 1;
          } else {
            this.$refs[pFormName].fields[CounDesc].validateState = '';
          }

          CounFilter++;
        }

        CounDesc++;
      }
      if (tmpFlagHasError == 1) {
        return false;
      }


      return true;
    },

		/* -- ------ #comment#用户方法# ------ -- */

    /* 验证权限 */
    checkUserPower: function (pDbName, pAction, pOtherCheck) {
      var tmpStrPowerSign;
      var tmpArUserPower;

      if (pDbName == "") {
        pDbName = this.sModel;
      }
      tmpStrPowerSign = pDbName + "__" + pAction;
      tmpArUserPower = this.$store.state.user.powermenuuser.split(",");

      //其它方式设置的权限，如果为false直接返回false
      if (pOtherCheck == false) {
        return false;
      }

      //用户功能权限
      if (this.In_array("ALLPOWER", tmpArUserPower)) {
        return true;
      }
      if (this.In_array(tmpStrPowerSign, tmpArUserPower)) {
        return true;
      }
      if (tmpArUserPower.length == 1) {
        if (tmpArUserPower[0] == "") {
          return true;
        }
      }

      return false;
    },
		getUserinfo:function() {
			this.user_token=common.readCookie("user","token");
			this.user_id=common.readCookie("user","id");
			this.user_name=common.readCookie("user","name");
			this.user_numcode=common.readCookie("user","numcode");
			this.user_role=common.readCookie("user","role");
			this.user_email=common.readCookie("user","email");
			this.user_mobile=common.readCookie("user","mobile");
			this.user_powermenuuser=common.readCookie("user","powermenuuser");
		},
		OnLogout:function(){
			common.writeCookie("user","token","");
			common.writeCookie("user","id","");
			common.writeCookie("user","name","");
			common.writeCookie("user","numcode","");
			common.writeCookie("user","role","");
			common.writeCookie("user","email","");
			common.writeCookie("user","mobile","");
			common.writeCookie("user","powermenuuser","");
			uni.redirectTo({ url:"/pages/userinfo/login" });
			console.log("OnLogout");
		},
		
		/* -- ------ #comment#功能方法# ------ -- */
		OnCallPhone:function(pPhoneNum) {
			uni.makePhoneCall({
				phoneNumber: pPhoneNum.toString()
			}).catch((e) => {
				// console.log(e)  //用catch(e)来捕获错误{makePhoneCall:fail cancel}
				console.log(e);
				return uni.showToast({ title:e });
			})
		},
    //-- #验证 pValue 是否在数组 pAR 里 --
    In_array: function (pValue, pAR) {
      var Coun0 = 0;
      while (pAR.length > Coun0) {
        if (pValue == pAR[Coun0]) {
          return 1;
        }
        Coun0++;
      }

      return 0;
    },
    //-- #数组合并为字符串 --
    Implode: function (pAr) {
      var Coun0;
      var tmpStr = "";
      Coun0 = 0;
      while (pAr.length > Coun0) {
        if (Coun0 > 0) {
          tmpStr += ",";
        }
        tmpStr += pAr[Coun0];
      }
      return tmpStr;
    },

		
		endFunction(){}
	}
}
