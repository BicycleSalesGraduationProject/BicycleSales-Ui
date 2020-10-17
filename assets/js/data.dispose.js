/**
 * 获取存到cookie中的用户登录信息。
 */
var cookie = $.cookie("userjson");
if (cookie != null && cookie != '') {
	var mydata = $.parseJSON(cookie);
	window.sessionStorage.setItem("userjson", cookie);
	$("#username").html(mydata.user.name + "");
}


/**
 * 通过自行车类别id查询自行车信息
 * @param {Object} bicycletypeid
 */
function getbicycleByTypeid(bicycletypeid) {
	var json = {};
	json['pageIndex'] = '';
	json['bicycletypeid'] = bicycletypeid;
	url = "queryBicycle";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				// $.cookie("allbicycle", JSON.stringify(data), { path : "/" });
				window.sessionStorage.setItem("allbicycle", JSON.stringify(data));
				window.location.href = "shop.html";
			} else {
				alert("未查询到任何信息！");
			}
		} else {
			alert("未查询到任何信息！");
		}
	})
}

/**
 * 通过sessionStorage中所有自行车信息，渲染页面
 */
function getallbicycle() {
	var my = window.sessionStorage.getItem("allbicycle");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		if (mydata.msg == "ok") {
			var str = "";
			//遍历数据
			var array = mydata.allbicycle;

			$.each(array, function(index, element) {
				var oldmoney = element['money'] * 1.2;
				var x = 100;
				var y = 5;
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				var secondphoto = "";
				if(element['secondphoto']!=''){
					secondphoto = element['secondphoto'];
				}
				else{
					secondphoto = element['firstphoto'];
				}
				if(element["delstate"]>0){
					str += "<div class='col-md-4 col-sm-6' >"
					str += "<div class='product-item'>" +
						"<figure class='product-thumb'>" +
						"<a href='javascript:void(0);' onclick='getbicycleById(" + element["bicycleid"] + ")'>" +
						"<img class='pri-img' src='" + element['firstphoto'] + "' alt='product'>" +
						"<img class='sec-img' src='" + secondphoto + "' alt='product'>" +
						"</a>" +
						"<div class='product-badge'>" +
						"<div class='product-label new'>" +
						"<span>new</span>" +
						"</div>" +
						"<div class='product-label discount'>" +
						"<span>" + rand + "%</span>" +
						"</div>" +
						"</div>" +
						"<div class='button-group'>" +
						"<a href='javascript:void(0);' data-toggle='tooltip' data-placement='left' onclick='insertCollect(" + element[
							"bicycleid"] + ")' title='收藏'><i class='lnr lnr-heart'></i></a>" +
						"<a href='javascript:void(0);' data-toggle='modal' data-target='#quick_view' onclick='getbicycleByIdShop(" +
						element["bicycleid"] + ")'><span data-toggle='tooltip' data-placement='left'" +
						"title='查看详情'><i class='lnr lnr-magnifier'></i></span></a>" +
						"<a href='javascript:void(0);' data-toggle='tooltip' data-placement='left' onclick='insertShopCar(" + element[
							"bicycleid"] + "," + 1 + "," + element["money"] + ")' title='添加购物车'><i class='lnr lnr-cart'></i></a>" +
						"</div>" +
						"</figure>" +
						"<div class='product-caption'>" +
						"<p class='product-name'>" +
						"<a href='javascript:void(0);' onclick='getbicycleById(" + element['bicycleid'] + ")'>" + element['name'] +
						"</a>" +
						"</p>" +
						"<div class='price-box'>" +
						"<span class='price-regular'>$" + element['money'].toFixed(2) + "</span>" +
						"<span class='price-old'><del>$" + oldmoney.toFixed(2) + "</del></span>" +
						"</div>" +
						"</div>" +
						"</div>";
					str += "</div>";
				}
			})

			$("#myallbicycle").html(str);
		} else {
			alert("未查询到任何信息！");
		}
	} else {
		alert("未查询到任何信息！");
	}
}

/**
 * 处理时间
 * @param {Object} time
 */
function ChangeDateFormat(time) {
	var birthdayMilliseconds = parseInt(time);
	//实例化一个新的日期格式，使用1970 年 1 月 1 日至今的毫秒数为参数
	var datetime = new Date(birthdayMilliseconds);
	datetime.setTime(time);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
	var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

/**
 * 通过自行车id获取详细信息,渲染shop.html页面自行车
 * @param {Object} bicycleId
 */
function getbicycleById(bicycleId) {

	var json = {};
	json['bicycleid'] = bicycleId;
	url = "queryBicycleById";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				window.sessionStorage.setItem("bicycle", JSON.stringify(data));
				window.location.href = "product-details.html";
			} else {
				alert("未查询到任何信息！");
			}
		} else {
			alert("未查询到任何信息！");
		}
	})
}

/**
 * 通过自行车id获取详细信息
 * @param {Object} bicycleId
 */
function getbicycleByIdShop(bicycleId) {
	var json = {};
	json['bicycleid'] = bicycleId;
	url = "queryBicycleById";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null) {
			if (data.msg == "ok") {
				var array = data.bicycle.photo;
				console.log(array);
				if (array != null && array.length > 0) {
					$.each(array, function(index, element) {
						$("#shop-bigphoto" + index).attr("src", element["path"]);
						$("#shop-littlephoto" + index).attr("src", element["path"]);
					})
				}
				$("#shop-bicyclename").html(data.bicycle.name);
				$("#shop-money").html("$" + data.bicycle.money.toFixed(2));
				$("#shop-oldmoney").html("<del>$" + (data.bicycle.money * 1.2).toFixed(2) + "</del>");
				$("#shop-inventory").html(data.bicycle.inventory + " 库存");
				$(".product-countdown").attr("data-countdown", "2020/11/25");
				//x上限，y下限     
				var x = 5;
				var y = 1;
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				var str = "";
				for (var i = 0; i < rand; i++) {
					str += "<span><i class='lnr lnr-star'></i></span>";
				}
				$("#shop-star").html(str);
				x = 5000;
				y = 2000;
				var rand1 = parseInt(Math.random() * (x - y + 1) + y);
				$("#shop-love").html((rand * rand1) + " 喜欢");
			} else {
				alert("未查询到任何信息！");
			}
		} else {
			alert("未查询到任何信息！");
		}
	})
}

/**
 * 通过sessionStorage中所有自行车信息，渲染页面
 */
function getbicycle() {
	var my = window.sessionStorage.getItem("bicycle");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		console.log(mydata);
		if (mydata.msg == "ok") {
			var array = mydata.bicycle.photo;
			console.log(array);
			if (array != null && array.length > 0) {
				$.each(array, function(index, element) {
					$("#bigphoto" + index).attr("src", element["path"]);
					$("#littlephoto" + index).attr("src", element["path"]);
				})
			}
			$("#bicyclename").html(mydata.bicycle.name);
			$("#money").html("$" + mydata.bicycle.money.toFixed(2));
			$("#oldmoney").html("<del>$" + (mydata.bicycle.money * 1.2).toFixed(2) + "</del>");
			$("#inventory").html(mydata.bicycle.inventory + " 库存");
			$("#insertCar").attr("onclick","insertShopCarProduct("+mydata.bicycle.bicycleid+",1)")
			$("#insertCollect").attr("onclick","insertCollect("+mydata.bicycle.bicycleid+")");
			//x上限，y下限
			var x = 10000;
			var y = 0;
			var rand = parseInt(Math.random() * (x - y + 1) + y);
			$("#love").html(rand + " 喜欢");
		} else {
			alert("未查询到任何信息！");
		}
	} else {
		alert("未查询到任何信息！");
	}
}

/**
 * 查询渲染最新自行车信息
 */
function getNewBicycle() {
	var json = {};
	json["pageIndex"] = "";
	json['delstate'] = 102;
	json['pageSize'] = 8;
	url = "queryDelstateBicycle";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == "ok") {
			var str = "";
			var array = data.bicyclelist;
			$.each(array, function(index, element) {
				var x = 100;
				var y = 5;
				var rand = parseInt(Math.random() * (x - y + 1) + y);
				var secondphoto = "";
				if(element['secondphoto']!=''){
					secondphoto = element['secondphoto'];
				}
				else{
					secondphoto = element['firstphoto'];
				}
				if(element["delstate"]>0){
					str += "<div class='col-lg-3 col-md-4 col-sm-6'>" +
						"<div class='product-item mt-40'>" +
						"<figure class='product-thumb'>" +
						"<a href='javascript:void(0);' onclick='getbicycleById(" + element['bicycleid'] + ")'>" +
						"<img class='pri-img' src='" + element['firstphoto'] + "' alt='product'>" +
						"<img class='sec-img' src='" + secondphoto + "' alt='product'>" +
						"</a>" +
						"<div class='product-badge'>" +
						"<div class='product-label new'>" +
						"<span>新</span>" +
						"</div>" +
						"<div class='product-label discount'>" +
						"<span>" + rand + "%</span>" +
						"</div>" +
						"</div>" +
						"<div class='button-group'>" +
						"<a href='javascript:void(0);' data-toggle='tooltip' data-placement='left' onclick='insertCollect(" + element[
							"bicycleid"] + ")' title='加入收藏'><i class='lnr lnr-heart'></i></a>" +
						"<a href='javascript:void(0);' data-toggle='tooltip' data-placement='left' onclick='insertShopCar(" + element[
							"bicycleid"] + "," + 1 + "," + element["money"] + ")' title='加入购物车'><i class='lnr lnr-cart'></i></a>" +
						"</div>" +
						"</figure>" +
						"<div class='product-caption'>" +
						"<p class='product-name'>" +
						"<a href='javascript:void(0);' onclick='getbicycleById(" + element['bicycleid'] + ")'>" + element['name'] +
						"</a>" +
						"</p>" +
						"<div class='price-box'>" +
						"<span class='price-regular'>$" + element['money'].toFixed(2) + "</span>" +
						"<span class='price-old'><del>$" + (element['money'] * 1.2).toFixed(2) + "</del></span>" +
						"</div>" +
						"</div>" +
						"</div>" +
						"</div>";
					}
			})
			str += "<div class='col-12'>" +
				"<div class='view-more-btn'>" +
				"<a class='btn-hero btn-load-more' href='shop.html'>更多</a>" +
				"</div>" +
				"</div>";
			$("#newBicycle").html(str);
		} else {
			// alert("未查询到任何信息!");
		}
	})
}

/**
 * 查询渲染最热自行车信息
 */
function getHotBicycle() {
	var json = {};
	json["pageIndex"] = "";
	json['delstate'] = 103;
	json['pageSize'] = 8;
	url = "queryDelstateBicycle";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == "ok") {
			var str = "";
			var array = data.bicyclelist;
			$.each(array, function(index, element) {
				var secondphoto = "";
				if(element['secondphoto']!=''){
					secondphoto = element['secondphoto'];
				}
				else{
					secondphoto = element['firstphoto'];
				}
				if(element["delstate"]>0){
				str += "<div class='product-item'>" +
					"<figure class='product-thumb'>" +
					"<a href='javascript:void(0);' onclick='getbicycleById(" + element['bicycleid'] + ")'>" +
					"<img class='pri-img' src='" + element['firstphoto'] + "' alt='product'>" +
					"<img class='sec-img' src='" + secondphoto + "' alt='product'>" +
					"</a>" +
					"<div class='product-badge'>" +
					"<div class='product-label new'>" +
					"<span>热</span>" +
					"</div>" +
					"</div>" +
					"<div class='button-group'>" +
					"<a href='javascript:void(0);' data-toggle='tooltip' data-placement='left' onclick='insertCollect(" + element[
						"bicycleid"] + ")' title='加入收藏'><i class='lnr lnr-heart'></i></a>" +
					"<a href='javascript:void(0);' data-toggle='tooltip' data-placement='left' onclick='insertShopCar(" + element[
						"bicycleid"] + "," + 1 + "," + element["money"] + ")' title='加入购物车'><i class='lnr lnr-cart'></i></a>" +
					"</div>" +
					"</figure>" +
					"<div class='product-caption'>" +
					"<p class='product-name'>" +
					"<a href='javascript:void(0);' onclick='getbicycleById(" + element['bicycleid'] + ")'>" + element['name'] +
					"</a>" +
					"</p>" +
					"<div class='price-box'>" +
					"<span class='price-regular'>$" + element['money'].toFixed(2) + "</span>" +
					"<span class='price-old'><del>$" + (element['money'] * 1.2).toFixed(2) + "</del></span>" +
					"</div>" +
					"</div>" +
					"</div>";
					}
			})
			$("#hotBicycle").html(str);
		} else {
			// alert("未查询到任何信息!");
		}
	})
}

/**
 * 添加购物车
 * @param {Object} bicycleId
 * @param {Object} num
 * @param {Object} money
 */
function insertShopCar(bicycleId, num, money) {
	var userjson = window.sessionStorage.getItem("userjson");
	// alert(cookie);
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		json['bicycleid'] = bicycleId;
		json['num'] = num;
		json['total'] = money * num;
		url = "insertShopCar";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				getShopCarNum();
				alert("购物车添加成功!");
			} else {
				alert("购物车添加失败!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}

}

/**
 * 添加购物车 商品详情页
 * @param {Object} bicycleId
 * @param {Object} num
 * @param {Object} money
 */
function insertShopCarProduct(bicycleId, num) {
	var userjson = window.sessionStorage.getItem("userjson");
	// alert(cookie);
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		var money = $("#money").html().replace("$","");
		json['userid'] = mydata.user.userid;
		json['bicycleid'] = bicycleId;
		json['num'] = $("#tnum").val();
		json['total'] = money * num;
		url = "insertShopCar";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				getShopCarNum();
				alert("购物车添加成功!");
				queryShopCarByUserId();
				window.location.href="cart.html";
			} else {
				alert("购物车添加失败!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 添加收藏
 * @param {Object} bicycleId
 */
function insertCollect(bicycleId) {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		json['bicycleid'] = bicycleId;
		url = "insertCollect";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				getCollectNum();
				alert("收藏成功!");
			} else {
				alert("收藏失败!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 查询渲染购物车数量
 */
function getShopCarNum() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		url = "queryShopCarNum";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				$("#shopcarnum").attr("class", "notification");
				$("#shopcarnum").html(data.shopcarnum);
			}
		})
	}
}

/**
 * 查询获取收藏数量
 */
function getCollectNum() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		url = "queryCollectNum";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				$("#collectnum").attr("class", "notification");
				$("#collectnum").html(data.collectnum);
			}
		})
	}
}

/**
 * 通过用户id查询购物车
 */
function queryShopCarByUserId() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		json['pageIndex'] = "";
		url = "queryShopCar";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				console.log(JSON.stringify(data));
				// window.location.href ="product-details.html";
			} else {
				// alert("你的购物车空空如也,快去添加一些吧!");
			}
			window.sessionStorage.setItem("allshopcar", JSON.stringify(data));
		});
		getShopCar();
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 查询渲染侧栏购物车
 */
function getShopCar() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var allshopcar = window.sessionStorage.getItem("allshopcar");
		var str = "";
		var mydata = $.parseJSON(allshopcar);
		var array = mydata.shopcarlist;
		var str = "";
		var array = mydata.shopcarlist;
		var totalnum = 0;
		var totalmoney = 0.00;
		$.each(array, function(index, element) {
			str += "<li class='minicart-item'>" +
				"<div class='minicart-thumb'>" +
				"<a href='javascript:void(0);' onclick='getbicycleById(" + element['bicycle'].bicycleid + ")'>" +
				"<img src='" + element['bicycle'].firstphoto + "' alt='product'>" +
				"</a>" +
				"</div>" +
				"<div class='minicart-content'>" +
				"<h3 class='product-name'>" +
				"<a href='javascript:void(0);' onclick='getbicycleById(" + element['bicycle'].bicycleid + ")'>" + element[
					'bicycle'].name + "</a>" +
				"</h3>" +
				"<p>" +
				"<span class='cart-quantity'>" + element['num'] + "<strong>&times;</strong></span>" +
				"<span class='cart-price'>$" + element['bicycle'].money.toFixed(2) + "</span>" +
				"</p>" +
				"</div>" +
				"<button onclick='delOneShopCar(" + element['bicycle'].bicycleid + ")'><i class='lnr lnr-cross'></i></button>" +
				"</li>";
			totalnum += element['num'];
			totalmoney += element['total'];
		})
		$("#shopcarindex").html(str);
		$("#totalnum").html(totalnum);
		$("#totalmoney").html(totalmoney.toFixed(2));
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 查询渲染个人页面购物车
 */
function getShopCarMyAccount() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var allshopcar = window.sessionStorage.getItem("allshopcar");
		var str = "";
		var mydata = $.parseJSON(allshopcar);
		var array = mydata.shopcarlist;
		str += "<table class='table table-bordered'>" +
			"<thead class='thead-light'>" +
			"<tr>" +
			"<th>编号</th>" +
			"<th>图片</th>" +
			"<th>名称</th>" +
			"<th>金额</th>" +
			"<th>查看详情</th>" +
			"</tr>" +
			"</thead>" +
			"<tbody>";
		$.each(array, function(index, element) {
			str += "<tr>" +
				"<td>" + (index + 1) + "</td>" +
				"<td><img style='width: 60px;height: 60px;' src='" + element['bicycle'].firstphoto + "' /></td>" +
				"<td>" + element['bicycle'].name + "</td>" +
				"<td>$" + element['bicycle'].money + "</td>" +
				"<td>" +
				"<a href='javascript:void(0);' onclick='getbicycleById(" + element['bicycle'].bicycleid +
				")' class='btn btn__bg'>详情</a>" +
				"</tr>";
		})
		str += "</tbody>" +
			"</table>";
		$("#myaccountshopcar").html(str);
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 查询渲染购物车页面购物车cart.html
 */
function getShopCarMyCart() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var allshopcar = window.sessionStorage.getItem("allshopcar");
		var str = "";
		var mydata = $.parseJSON(allshopcar);
		var array = mydata.shopcarlist;
		str += "<table class='table table-bordered'>" + 
				"<thead>" + 
				"    <tr>" + 
				"    	<th class='pro-thumbnail'>全选</th>" + 
				"        <th class='pro-thumbnail'>图片</th>" + 
				"        <th class='pro-title'>名称</th>" + 
				"        <th class='pro-price'>价钱</th>" + 
				"        <th class='pro-quantity'>数量</th>" + 
				"        <th class='pro-subtotal'>合计</th>" + 
				"        <th class='pro-remove'>操作</th>" + 
				"    </tr>" + 
				"</thead>" + 
				"<tbody>";
		$.each(array, function(index, element) {
			str+="    <tr>" + 
				"    	<td><input type='checkbox' id='mycheckbox"+index+"' class='mycheckbox' name='"+element['num']+";"+ ((element['total']/element['num'])*element['num']).toFixed(2) + "' value='" + (index+1) + "'></input></td>" + 
				"        <td class='pro-thumbnail'><a href='javascript:void(0)' onclick='getbicycleById(" + element['bicycle'].bicycleid + ")'><img class='img-fluid' src='" + element['bicycle'].firstphoto + "' alt='Product' /></a></td>" + 
				"        <td class='pro-title'><a href='javascript:void(0)' onclick='getbicycleById(" + element['bicycle'].bicycleid + ")'>" + element['bicycle'].name + "</a></td>" + 
				"        <td class='pro-price'><span id='myprice"+index+"'>$" + (element['total']/element['num']).toFixed(2) + "</span></td>" + 
				"        <td class='pro-quantity'>" + 
				"            <div class=''><button onclick='add("+index+")'>+</button><input id='mynum"+index+"' type='text' value='"+element['num']+"'><button onclick='jian("+index+")'>-</button></div>" + 
				"        </td>" + 
				"        <td class='pro-subtotal'><span id='mytotal"+index+"'>$" + (element['total']).toFixed(2) + "</span></td>" + 
				"        <td class='pro-remove'><a href='javascript:void(0)' onclick='delOneShopCar(" + element['bicycle'].bicycleid + ")'><i class='fa fa-trash-o'></i></a></td>" + 
				"    </tr>  ";
		})
		str += "</tbody>" +
			"</table>";
		$("#mycarshopcar").html(str);
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

function add(id){
	var mynum = parseInt($("#mynum"+id).val());
	var newNum = mynum+1;
	$("#mynum"+id).val(newNum);
	var myprice = parseFloat($("#myprice"+id).html().replace("$",""));
	$("#mytotal"+id).html("$"+(myprice*newNum).toFixed(2));
	$("#mycheckbox"+id).attr("name",newNum+";"+(myprice*newNum).toFixed(2));
}

function jian(id){
	var mynum = parseInt($("#mynum"+id).val());
	if(mynum>1){
		var newNum = mynum-1;
		$("#mynum"+id).val(newNum);
		var myprice = parseFloat($("#myprice"+id).html().replace("$",""));
		$("#mytotal"+id).html("$"+(myprice*newNum).toFixed(2));
		$("#mycheckbox"+id).attr("name",newNum+";"+(myprice*newNum).toFixed(2));
		
	}
}

/**
 * 删除购物车
 * @param {Object} bicycleid
 */
function delOneShopCar(bicycleid) {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		json['bicycleids'] = bicycleid + ";";
		json['pageIndex'] = "";
		url = "delShopCar";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				queryShopCarByUserId();
				getShopCar();
				getShopCarNum();
				getShopCarMyCart();
				alert("购物车删除成功!");
			} else {
				alert("购物车删除失败!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 通过用户id查询收藏
 */
function queryCollectByUserId() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		json['pageIndex'] = "";
		url = "queryCollect";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				window.sessionStorage.setItem("allcollect", JSON.stringify(data));
				window.location.href = "wishlist.html";
			} else {
				// alert("你的收藏空空如也,快去添加一些吧!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 通过用户id查询收藏 个人界面
 */
function queryCollectByUserIdMyAccount() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		json['pageIndex'] = "";
		url = "queryCollect";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				window.sessionStorage.setItem("allcollect", JSON.stringify(data));
			} else {
				alert("你的收藏空空如也,快去添加一些吧!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 查询渲染用户收藏
 */
function getCollect() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var allcollect = window.sessionStorage.getItem("allcollect");
		var str = "";
		str += "<table class='table table-bordered'>" +
			"<thead>" +
			"<tr>" +
			"<th class='pro-thumbnail'>图片</th>" +
			"<th class='pro-title'>名称</th>" +
			"<th class='pro-price'>价钱</th>" +
			"<th class='pro-quantity'>库存</th>" +
			"<th class='pro-subtotal'>加入购物车</th>" +
			"<th class='pro-remove'>移除</th>" +
			"</tr>" +
			"</thead>" +
			"<tbody>";
		var mydata = $.parseJSON(allcollect);
		var array = mydata.userallcollect;
		$.each(array, function(index, element) {
			str += "<tr>" +
				"<td class='pro-thumbnail'>" +
				"<a href='#'><img class='img-fluid' src='" + element['bicycle'].firstphoto + "' alt='Product' /></a>" +
				"</td>" +
				"<td class='pro-title'>" +
				"<a href='#'>" + element['bicycle'].name + "</a>" +
				"</td>" +
				"<td class='pro-price'><span>$" + element['bicycle'].money.toFixed(2) + "</span></td>" +
				"<td class='pro-quantity'><span class='text-success'>" + element['bicycle'].inventory + "</span></td>" +
				"<td class='pro-subtotal'>" +
				"<a href='javascript:void(0);' onclick='insertShopCar(" + element['bicycle'].bicycleid + "," + 1 + "," + element[
					'bicycle'].money + ")' class='btn btn__bg'>加入购物车" +
				"</a>" +
				"</td>" +
				"<td class='pro-remove'>" +
				"<a href='javascript:void(0);' onclick='delCollect(" + element['bicycle'].bicycleid +
				")'><i class='fa fa-trash-o'></i></a>" +
				"</td>" +
				"</tr>";
		})
		str += "</tbody>" +
			"</table>";
		$("#usercollect").html(str);
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 查询渲染个人页面购物车
 */
function getCollectMyAccount() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var allcollect = window.sessionStorage.getItem("allcollect");
		var str = "";
		var mydata = $.parseJSON(allcollect);
		var array = mydata.userallcollect;
		str += "<table class='table table-bordered'>" +
			"<thead class='thead-light'>" +
			"<tr>" +
			"<th>编号</th>" +
			"<th>图片</th>" +
			"<th>名称</th>" +
			"<th>金额</th>" +
			"<th>查看详情</th>" +
			"</tr>" +
			"</thead>" +
			"<tbody>";
		$.each(array, function(index, element) {
			str += "<tr>" +
				"<td>" + (index + 1) + "</td>" +
				"<td><img style='width: 60px;height: 60px;' src='" + element['bicycle'].firstphoto + "' /></td>" +
				"<td>" + element['bicycle'].name + "</td>" +
				"<td>$" + element['bicycle'].money.toFixed(2) + "</td>" +
				"<td>" +
				"<a href='javascript:void(0);' onclick='getbicycleById(" + element['bicycle'].bicycleid +
				")' class='btn btn__bg'>详情</a>" +
				"</tr>";
		})
		str += "</tbody>" +
			"</table>";
		$("#myaccountcollect").html(str);
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 移除用户收藏
 * @param {Object} bicycleid
 */
function delCollect(bicycleid) {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		json['bicycleid'] = bicycleid;
		url = "delCollect";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				queryCollectByUserId();
				getCollect();
				alert("收藏移除成功!");
			} else {
				alert("收藏移除失败!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 显示个人所有地址
 */
function queryAddress() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		var json = {};
		json['userid'] = mydata.user.userid;
		url = "queryAddress";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				var str = "";
				str += "<table class='table table-bordered'>" +
					"<thead class='thead-light'>" +
					"<tr>" +
					"<th>编号</th>" +
					"<th>姓名</th>" +
					"<th>地址</th>" +
					"<th>电话</th>" +
					"<th>是否默认</th>" +
					"<th>操作</th>" +
					"</tr>" +
					"</thead>" +
					"<tbody>";
				var array = data.useralladdress;
				$.each(array, function(index, element) {
					var is = "";
					if (element['adsdefault'] == 1) {
						is = "是";
					} else if (element['adsdefault'] == 0) {
						is = "否";
					}
					if (element['delstate'] != 2) {
						str += "<tr>" +
							"<td>1</td>" +
							"<td><strong>" + element['name'] + "</strong></td>" +
							"<td>" + element['adsdetails'] + "</td>" +
							"<td>" + element['tel'] + "</td>" +
							"<td>" + is + "</td>" +
							"<td><a href='javascript:void(0);' onclick='delAddress(" + element['adsid'] +
							")'><i class='fa fa-trash-o'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='setAddressDefaultStatus(" +
							element['adsid'] + ")'><i class='fa fa-file-word-o'></i></a></td>" +
							"</tr>";
					}
				})
				str += "</tbody>" +
					"</table>";
				$("#myaccountaddress").html(str);
			} else {
				alert("没查到任何您的收货地址信息!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}


/**
 * 添加地址
 */
function insertAddress() {
	if ($("#confirm-name").val() != "" && $("#confirm-tel").val() != "") {
		var userjson = window.sessionStorage.getItem("userjson");
		if (userjson != null && userjson != '') {
			var mydata = $.parseJSON(userjson);
			var json = {};
			json['userid'] = mydata.user.userid;
			json['name'] = $("#confirm-name").val();
			json['tel'] = $("#confirm-tel").val();
			json['adsDetails'] = $("#new-address").val();
			json['privince'] = $("#privince").val();
			json['city'] = $("#city").val();
			json['district'] = $("#district").val();
			json['adsLabel'] = '';
			url = "insertAddress";
			// alert(JSON.stringify(json));
			MySubmitString(JSON.stringify(json), url, function(data) {
				if (data != null && data.msg == "ok") {
					queryAddress();
					alert("地址添加成功!");
				} else {
					alert("没查到任何您的收货地址信息!");
				}
			})
		} else {
			alert("请先登录!");
			window.location.href = "login.html";
		}
	}
}

/**
 * 删除地址
 * @param {Object} addressid
 */
function delAddress(addressid) {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var json = {};
		json['userid'] = mydata.user.userid;
		json['adsid'] = addressid;
		json['delstate'] = 2;
		json['addressid'] = addressid;
		var url = "setAddressStatus";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				queryAddress();
				alert("地址删除成功!")
			} else {
				alert("地址删除失败!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 将用户的某个地址设置为默认地址
 * @param {Object} addressid
 */
function setAddressDefaultStatus(addressid) {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var json = {};
		json['userid'] = mydata.user.userid;
		json['adsid'] = addressid;
		var url = "setAddressDefault";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if (data != null && data.msg == "ok") {
				queryAddress();
				alert("设置默认地址成功!")
			} else {
				alert("设置默认地址失败!");
			}
		})
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 省市区初始化
 */
function initializeAddress() {
	queryAddress();
	var json = {};
	url = "initializeAddress";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == "ok") {
			$("#myaddress").html("");
			var str = "";
			var array_pro = data.pro;
			var proSelect = document.createElement("select");
			proSelect.id = "privince";
			proSelect.className = "form-control";
			$.each(array_pro, function(index, element) {
				proSelect.options.add(new Option(element['proname'], element['proid'])); //这个兼容IE与firefox
			})
			var citSelect = document.createElement("select");
			citSelect.id = "city";
			citSelect.className = "form-control";
			var array_cit = data.city;
			$.each(array_cit, function(index, element) {
				citSelect.options.add(new Option(element['citname'], element['citid'])); //这个兼容IE与firefo
			})
			var disSelect = document.createElement("select");
			disSelect.id = "district";
			disSelect.className = "form-control";
			var array_dis = data.dis;
			$.each(array_dis, function(index, element) {
				disSelect.options.add(new Option(element['disname'], element['disid'])); //这个兼容IE与firefo
			})
			$("#myaddress").append(proSelect);
			$("#myaddress").append(citSelect);
			$("#myaddress").append(disSelect);
		} else {
			alert("省市区初始化失败!");
		}
	})

}

/**
 * 根据省id更新市区信息
 */
$('body').on('change', '#privince', function() {
	var json = {};
	json['proid'] = $("#privince").val();
	url = "queryAddressByProId";
	// alert(JSON.stringify(json));
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == "ok") {
			var array_cit = data.city;
			document.getElementById("city").length = 0;
			$.each(array_cit, function(index, element) {
				// $("#city").options.add(new Option(element['citname'],element['citid'])); //这个兼容IE与firefo
				document.getElementById("city").options.add(new Option(element['citname'], element['citid'])); //这个兼容IE与firefo
			})
			document.getElementById("district").length = 0;
			var array_dis = data.dis;
			$.each(array_dis, function(index, element) {
				// $("#district").options.add(new Option(element['disname'],element['disid'])); //这个兼容IE与firefo
				document.getElementById("district").options.add(new Option(element['disname'], element['disid'])); //这个兼容IE与firefo
			})
		} else {
			alert("省市区渲染失败!");
		}
	})
})

/**
 * 根据市id更新区信息
 */
$('body').on('change', '#city', function() {
	var json = {};
	json['citid'] = $("#city").val();
	url = "queryAddressByCitId";
	// alert(JSON.stringify(json));
	MySubmitString(JSON.stringify(json), url, function(data) {
		if (data != null && data.msg == "ok") {
			var array_dis = data.dis;
			document.getElementById("district").length = 0;
			$.each(array_dis, function(index, element) {
				// $("#district").options.add(new Option(element['disname'],element['disid'])); //这个兼容IE与firefo
				document.getElementById("district").options.add(new Option(element['disname'], element['disid'])); //这个兼容IE与firefo
			})
		} else {
			alert("省市区渲染失败!");
		}
	})
})

/**
 * 账户修改回显
 */
function getUpdateMessage() {
	var userjson = window.sessionStorage.getItem("userjson");
	if (userjson != null && userjson != '') {
		var mydata = $.parseJSON(userjson);
		$("#display-name").attr("value", mydata.user.name);
		$("#display-numid").attr("value", mydata.user.idnumber);
		$("#email").attr("value", mydata.user.email);
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 修改个人信息
 */
function updateUserMessage() {
	var appEmailVerifyCode = window.sessionStorage.getItem("appEmailVerifyCode");
	var userjson = window.sessionStorage.getItem("userjson");
	var json = {};
	var flag = 0;
	if (userjson != null && userjson != '') {
		var mydate = $.parseJSON(userjson);
		json['userid'] = mydata.user.userid;
		if (mydate.user.email != $("#email").val()) {
			flag += 1;
			if (appEmailVerifyCode == null && appEmailVerifyCode == '') {
				alert("请获取验证码！");
			} else if ($("#display-code").val() != null && $("#display-code").val() != "") {
				var mycode = $.parseJSON(appEmailVerifyCode);
				if (mycode.code == $.md5($("#display-code").val())) {
					flag += 1;
					json['code'] = $("#display-code").val();
				} else {
					alert("验证码错误！");
				}
			}
			if ($("#display-code").val() == "") {
				flag -= 1;
				alert("请填写验证码！");
			}
			json['email'] = $("#email").val();
		} else {
			json['code'] = "";
			json['email'] = "";
		}
		json['idnumber'] = "";
		json['password'] = "";
		json['userstate'] = "";
		if ($("#display-name").val() != null && mydate.user.name != $("#display-name").val()) {
			flag += 1;
			json['name'] = $("#display-name").val();
		} else {
			json['name'] = "";
		}
		if (flag > 0) {
			url = "updateUserMessage";
			MySubmitString(JSON.stringify(json), url, function(data) {
				if (data != null && data.msg == "ok") {
					alert("个人信息修改成功！请重新登录！")
					window.location.href = "login.html";
				} else if (data != null && data.msg == "ERROR") {
					alert("验证码错误！");
				} else if (data != null && data.msg == "LOSE_EFFICAAY") {
					alert("验证码失效，请重新获取！");
				} else if (data != null && data.msg == "no_4") {
					alert("邮箱已改变，请重新获取验证码！");
					var app = {};
					app['code'] = "no_4";
					app['msg'] = "ok";
					window.sessionStorage.setItem("appEmailVerifyCode", JSON.stringify(app));
				} else {
					alert("个人信息修改失败!");
				}
			})
		}
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 修改密码
 */
function updatePassword() {
	var userjson = window.sessionStorage.getItem("userjson");
	var json = {};
	json['name'] = "";
	json['idnumber'] = "";
	json['userstate'] = "";
	if (userjson != null && userjson != '') {
		var mydate = $.parseJSON(userjson);
		json['userid'] = mydata.user.userid;
		if ($("#current-pwd").val() != '') {
			var pwd = $.md5($("#current-pwd").val());
			if (mydate.user.password == pwd) {
				if ($("#new-pwd").val() != '' && $("confirm-pwd").val() != '') {
					if ($("#new-pwd").val() == $("#confirm-pwd").val()) {
						json['password'] = $("#new-pwd").val();
						url = "updateUserPassword";
						MySubmitString(JSON.stringify(json), url, function(data) {
							if (data != null && data.msg == "ok") {
								alert("密码修改成功！请重新登录！")
								window.location.href = "login.html";
							} else {
								alert("密码修改失败!");
							}
						})
					} else {
						alert("输入的两次密码不一致");
					}
				}
			} else {
				alert("旧密码错误！");
			}
		}
	} else {
		alert("请先登录!");
		window.location.href = "login.html";
	}
}

/**
 * 忘记密码的密码修改
 */
function updatePasswordForget() {
	var appEmailVerifyCode = window.sessionStorage.getItem("appEmailVerifyCode");
	if(appEmailVerifyCode!=null&&appEmailVerifyCode!=''){
		var mydata = $.parseJSON(appEmailVerifyCode);
		if(mydata.msg=="ok"){
			var json = {};
			json['name'] = "";
			json['idnumber'] = "";
			json['userstate'] = "";
			json['code'] = mydata.code;
			json['email'] = mydata.email;
			if ($("#new-pwd").val() != '' && $("confirm-pwd").val() != '') {
				if ($("#new-pwd").val() == $("#confirm-pwd").val()) {
					json['password'] = $("#new-pwd").val();
					url = "updateUserPasswordByEmail";
					MySubmitString(JSON.stringify(json), url, function(data) {
						if (data != null && data.msg == "ok") {
							alert("密码修改成功！请重新登录！")
							window.location.href = "login.html";
						} else {
							alert("密码修改失败!");
						}
					})
				} else {
					alert("输入的两次密码不一致");
				}
			}
		}
		else{
			alert("邮箱验证失败，请重新验证！");
			window.location.href = "find-email.html";
		}
	}
	else{
		alert("验证超时，请重新验证邮箱！");
		window.location.href = "find-email.html";
	}
	
}

function setCookie(key,value,t){
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+t);
    document.cookie=key+"="+value+"; expires="+oDate.toDateString()+ "; path=/";
}

/**
 * 获取cookie
 * @param {Object} name
 */
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

/**
 * 删除cookie
 * @param {Object} name
 */
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + "; path=/";
}

/**
 * 退出账号
 */
function quitAccpount() {
	delCookie('userjson'); //path为指定路径，直接删除该路径下的cookie
	window.sessionStorage.setItem("userjson", "");
	window.location.href = "login.html";
}

/**
 * 用户反馈添加
 */
function sentFeedBack() {
	if ($("#name").val() != '' && $("#tel").val() != '' && $("#email").val() != '' && $("#issue").val() != '' && $(
			"#voicemessage").val() != '') {
		var json = {};
		json['name'] = $("#name").val();
		json['tel'] = $("#tel").val();
		json['email'] = $("#email").val();
		json['issue'] = $("#issue").val();
		json['voiceMessage'] = $("#voicemessage").val();
		url = "insertUserFeedBack";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if(data!=null&&data.msg=="ok"){
				alert("发送成功！");
			}
			else{
				alert("发送失败！");
			}
		})
	}
}

/**
 * 添加订单
 */
function inderOrder(){
	var str = "";
	var userjson = window.sessionStorage.getItem("userjson");
	var allshopcar = window.sessionStorage.getItem("allshopcar");
	var mydateuserjson = $.parseJSON(userjson);
	var mydata = $.parseJSON(allshopcar);
	var array = mydata.shopcarlist;
	var json = {};
	var jsonones = [];
	var flag = 0;
	$.each($('input:checkbox'), function() {
		if (this.checked) {
			flag+=1;
			var da = array[$(this).val()-1];
			var str = $(this).attr("name").split(";");
			da['money'] = parseFloat(str[1]/str[0]).toFixed(2);
			da['num'] = parseInt(str[0]);
			da['total'] = parseFloat(str[1]).toFixed(2);
			jsonones.push(da);
		}
		
	});
	if(flag>0){
		json['totalnum'] = $("#total-num").html();
		json['totalmoney'] = $("#total-money").html();
		json['userid'] = mydateuserjson.user.userid;
		json['bicycles'] = jsonones;
		console.log(json);
	}
	url = "insertOrder";
	MySubmitString(JSON.stringify(json), url, function(data) {
		if(data!=null&&data.msg=="ok"){
			alert("订单提交成功！");
			window.sessionStorage.setItem("orderno",data.orderno);
			window.location.href="checkout.html";
		}
		else if(data!=null&&data.msg=="NOT_LIST"){
			alert("你还没添加收货地址呢，快去添加一个吧！");
		}
		else{
			alert("订单提交失败！");
		}
	})
}

/**
 * 通过订单编号查询订单详情
 */
function queryOrderDetailByOrderNo(){
	var orderno = window.sessionStorage.getItem("orderno");
	if(orderno!=null&&orderno!=''){
		var json = {}
		json['orderno'] = orderno;
		var url="queryOrderDetailByOrderNo";
		MySubmitString(JSON.stringify(json), url, function(data) {
			console.log(JSON.stringify(data));
			if(data!=null&&data.msg=="ok"){
				var str="<table class='table table-bordered'>" + 
				"<thead>" + 
				"	<tr>" + 
				"		<th><strong>商品</strong></th>" + 
				"		<th><strong>总价</strong></th>" + 
				"	</tr>" + 
				"</thead>" + 
				"<tbody>";
				var array = data.allorderformdetail;
				var totalmoney = 0.0;
				$.each(array, function(index, element) {
					str+="	<tr>" + 
					"		<td>" + 
					"			<a href='product-details.html'>"+element['bicycle'].name+"<strong></strong></a>" + 
					"		</td>" + 
					"		<td>$"+element['money']+"</td>" + 
					"	</tr>";
					totalmoney += parseFloat(element['money']);
				})
				str+="</tbody>" + 
				"<tfoot>" + 
				"	<tr>" + 
				"		<td>合计金额</td>" + 
				"		<td>$<span id='totalmoney'>"+totalmoney.toFixed(2)+"</span></td>" + 
				"	</tr>		" + 
				"</tfoot>" + 
				"</table>";
				$("#orderCheckOut").html(str);
				window.sessionStorage.setItem("totalmoney",totalmoney.toFixed(2))
			}
			else{
				alert("未查询到任何订单详情！");
			}
		})
	}
}

function payOrder(){
	if($("input[type='checkbox']").is(':checked')){
		var radio = $("input[name='paymentmethod']:checked").val();
		if(radio=='check'){
			var json = {};
			var url = "alipayTradePagePay";
			json['outTradeNo'] = window.sessionStorage.getItem("orderno");
			json['totalAmount'] = $("#totalmoney").html();
			json['subject'] = "自行车销售";
			json['body'] = "";
			PaySubmitString(JSON.stringify(json), url, function(data) {
				if(data!=null&&data!=''){
					document.write(data);
				}
				else{
					alert("支付失败！");
				}
			})
		}
		else{
			alert("支付成功！")
		}
	}
}

/**
 * 查询该用户的所有订单数据
 */
function queryOrderByUserId(){
	var json = {};
	var userjson = window.sessionStorage.getItem("userjson");
	if(userjson!=null&&userjson!=''){
		var mydateuserjson = $.parseJSON(userjson);
		json['userid'] = mydateuserjson.user.userid;
		var url = "queryOrderByUserId";
		MySubmitString(JSON.stringify(json), url, function(data) {
			if(data!=null&&data!=''){
				window.sessionStorage.setItem("orderFormByUserId",JSON.stringify(data));
				getOrderMyAccount();
			}
			else{
				alert("未查询任何订单信息！");
			}
		})
	}
	else{
		alert("请先登录！");
	}
}

/**
 * 将该用户的所有订单数据渲染到页面
 */
function getOrderMyAccount(){
	var my = window.sessionStorage.getItem("orderFormByUserId");
	if(my!=''&&my!=null){
		var str="<table class='table table-bordered'>" +
		"<thead class='thead-light'>" + 
		"	<tr>" + 
		"		<th>编号</th>" + 
		"		<th>下单日期</th>" + 
		"		<th>总价</th>" + 
		"		<th>总数</th>" + 
		"		<th>支付状态</th>" + 
		"		<th>订单状态</th>" + 
		"	</tr>" + 
		"</thead>" + 
		"<tbody>";
		var mydata = $.parseJSON(my);
		var array = mydata.OrderFormByUserIdList;
		$.each(array, function(index, element) {
			var paystatus = "";
			var sendstaus = "";
			if(element['orderformstate']==0){
				sendstaus="订单取消";
			}
			else if(element['orderformstate']==3){
				sendstaus="未发货";
			}
			else if(element['orderformstate']==4){
				sendstaus="已发货";
			}
			else if(element['orderformstate']==5){
				sendstaus="退货";
			}
			else if(element['orderformstate']==7){
				sendstaus="配货中";
			}
			else if(element['orderformstate']==8){
				sendstaus="配送中";
			}
			else{
				sendstaus="完成";
			}
			if(element['paymoneystate']==1){
				paystatus="未付款";
			}
			else{
				paystatus="已付款";
			}
			str+="	<tr>" + 
			"		<td>"+(index+1)+"</td>" + 
			"		<td>"+ChangeDateFormat(element['createtime'].time)+"</td>" + 
			"		<td>$"+element['totalmoney']+"</td>" + 
			"		<td>"+element['totalnum']+"</td>" + 
			"		<td>"+paystatus+"</td>" + 
			"		<td>"+sendstaus+"</td>" + 
			"	</tr>";
		})
		str+="</tbody>" + 
		"</table>";
		$("#myorderlist").html(str);
	}
	else{
		alert("未查询到任何订单信息！");
	}
}

/**
 * 验证码校验
 */
function verificationCode(){
	var appEmailVerifyCode = window.sessionStorage.getItem("appEmailVerifyCode");
	if(appEmailVerifyCode!=null&&appEmailVerifyCode!=''){
		var mycode = $.parseJSON(appEmailVerifyCode);
		if(mycode.msg=="ok"){
			var m = hex_md5($("#display-code").val());
			if(mycode.code==m){
				// mycode['email'] = $("#email").val();
				// window.sessionStorage.setItem("appEmailVerifyCode",JSON.stringify(mycode));
				window.location.href="update-password.html";
			}
			else{
				alert("验证码错误！");
			}
		}
		else{
			alert("验证码错误，请重新获取！");
		}
	}
	else{
		alert("请获取验证码！");
	}
}

/**
 * 注册用户
 */
function registerUser(){
	if($("#rname").val()!=""&&$("#email").val()!=""&&$("#display-code").val()!=""&&$("#new-pwd").val()!=""&&$("#confirm-pwd").val()!=""){
		var appEmailVerifyCode = window.sessionStorage.getItem("appEmailVerifyCode");
		var json = {};
		json['name'] = $("#rname").val();
		json['email'] = $("#email").val();
		json['code'] = $("#display-code").val();
		json['idnumber'] = "";
		var appEmailVerifyCode = window.sessionStorage.getItem("appEmailVerifyCode");
		if(appEmailVerifyCode!=null&&appEmailVerifyCode!=''){ 
			var mycode = $.parseJSON(appEmailVerifyCode);
			if(mycode.msg=="ok"){
				if(mycode.email==$("#email").val()){
					var m = hex_md5($("#display-code").val());
					if(mycode.code==m){
						if($("#confirm-pwd").val()==$("#new-pwd").val()){
							json['password'] = $("#confirm-pwd").val();
							var url = "userRegister";
							MySubmitString(JSON.stringify(json), url, function(data) {
								if(data!=null&&data.msg=="ok"){
									alert("注册成功！");
									window.location.href="login.html";
								}
								else if(data!=null&&data.msg=="no_3"){
									alert("该邮箱已被注册！");
								}
								else{
									alert("注册失败！");
								}
							})
						}
						else{
							alert("两次密码不一致！");
						}
					}
					else{
						alert("验证码错误！");
					}
				}
				else{
					var codenot = {};
					codenot['msg'] = "no";
					window.sessionStorage.setItem("appEmailVerifyCode",JSON.stringify(codenot));
					alert("邮箱已改变，请重新获取验证码！");
				}
			}
			else{
				alert("验证码错误，请重新获取！");
			}
		}
		else{
			alert("请获取验证码！");
		}
		
	}
}

/**
 * 根据用户选择改变钱数
 */
function getMySelect(){
	var my = window.sessionStorage.getItem("bicycle");
	if (my != null && my != '') {
		var mydata = $.parseJSON(my);
		var totalMoney =  mydata.bicycle.money;
		var zhibuo = $("#zhibuo").val();
		var houbo = $("#houbo").val();
		var qianbo = $("#qianbo").val();
		var feilun = $("#feilun").val();
		var liantiao = $("#liantiao").val();
		totalMoney = parseFloat(totalMoney) + parseFloat(zhibuo) + parseFloat(houbo) + parseFloat(qianbo) + parseFloat(feilun) + parseFloat(liantiao);
		$("#money").html("$"+totalMoney.toFixed(2));
		$("#oldmoney").html("$"+(totalMoney*1.2).toFixed(2));
	}
}