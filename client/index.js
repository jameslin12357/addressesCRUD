var table,layer,id;
layui.use(['table','layer'], function(){
    table = layui.table;
    layer = layui.layer;
    table.render({
        elem: '#test'
        ,url:'http://localhost:3001/addresses'
        ,cols: [[
            {field:'addressId', title: 'AddressID'}
            ,{field:'streetName', title: 'Street Name'}
            ,{field:'streetAddress', title: 'Street Address'}
            ,{field:'city', title: 'City'}
            ,{field:'country', title: 'Country'}
            ,{field:'zipCode', title: 'ZipCode'}
            ,{field:'latitude', title: 'Latitude'}
            ,{field:'longitude', title: 'Longitude'}
            ,{field:'created', title: 'Created'}
            ,{field:'updated', title: 'Updated'}
            ,{fixed: 'right', width: 200, title: 'CRUD', align:'center', toolbar: '#barDemo'}        
]]
        ,toolbar: '#barDemo2'
        ,page: true
        ,title: "AddressCRUD"
    });
//监听工具条 
table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

    if (layEvent === 'detail') { //查看
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "Address",
            content: `<div>
                             <p><span>AddressID:</span> <span>${data["addressId"]}</span></p>
                             <p><span>Street Name:</span> <span>${data["streetName"]}</span></p>
                             <p><span>Street Address:</span> <span>${data["streetAddress"]}</span></p>
                             <p><span>City:</span> <span>${data["city"]}</span></p>
                             <p><span>Country:</span> <span>${data["country"]}</span></p>
                             <p><span>ZipCode:</span> <span>${data["zipCode"]}</span></p>
                             <p><span>Latitude:</span> <span>${data["latitude"]}</span></p>
                             <p><span>Longitude:</span> <span>${data["longitude"]}</span></p>
                             <p><span>Created:</span> <span>${data["created"]}</span></p>
                             <p><span>Updated:</span> <span>${data["updated"]}</span></p>                            
</div>`
        });
        //layer.msg(JSON.stringify(data));
        console.log(data);
    } else if (layEvent === 'del') { //删除
        id = data["addressId"];
        layer.open({
            btn: [],
            shade: 0,
            title: "Delete address",
            content: `<div><div class="mb-15 tc">Confirm delete address?</div><div class="tr"><button id="buttonDelete" type="submit" class="layui-btn layui-btn-danger">Delete</button></div></div>`
        });
        document.getElementById("buttonDelete").addEventListener("click", function (e) {
            deleteAddressPost();
        });
    } else if (layEvent === 'edit') { //编辑
        id = data["addressId"];
        layer.open({
            btn: [],
            shade: 0,
            title: "Edit address",
            content: `<form class="layui-form layui-form-pane" action="">
                              <div class="layui-form-item">
                    <label class="layui-form-label">Street Name</label>
                    <div class="layui-input-inline">
                      <input type="text" name="streetName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["streetName"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Street Address</label>
                    <div class="layui-input-inline">
                      <input type="text" name="streetAddress" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${data["streetAddress"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">City</label>
                    <div class="layui-input-inline">
                      <input type="text" name="city" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["city"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Country</label>
                    <div class="layui-input-inline">
                      <input type="text" name="country" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${data["country"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">ZipCode</label>
                    <div class="layui-input-inline">
                      <input type="text" name="zipCode" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["zipCode"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Latitude</label>
                    <div class="layui-input-inline">
                      <input type="text" name="latitude" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["latitude"]}">
                    </div>
                  </div>
  <div class="layui-form-item">
                    <label class="layui-form-label">Longitude</label>
                    <div class="layui-input-inline">
                      <input type="text" name="longitude" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["longitude"]}">
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">Save</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit", function (e) {
            e.preventDefault();
            editAddressPost();
        });
    } 


});

table.on('toolbar(test)', function(obj){
  var checkStatus = table.checkStatus(obj.config.id);
  switch(obj.event){
    case 'create':
         layer.open({
            btn: [],
            shade: 0,
            title: "Create address",
            content: `<form class="layui-form layui-form-pane" action="">
                   <div class="layui-form-item">
                    <label class="layui-form-label">Street Name</label>
                    <div class="layui-input-inline">
                      <input type="text" name="streetName" lay-verify="required" placeholder="Enter street name" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Street Address</label>
                    <div class="layui-input-inline">
                      <input type="text" name="streetAddress" lay-verify="required" placeholder="Enter street address" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">City</label>
                    <div class="layui-input-inline">
                      <input type="text" name="city" lay-verify="required" placeholder="Enter city" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Country</label>
                    <div class="layui-input-inline">
                      <input type="text" name="country" lay-verify="required" placeholder="Enter country" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">ZipCode</label>
                    <div class="layui-input-inline">
                      <input type="text" name="zipCode" lay-verify="required" placeholder="Enter zip code" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Latitude</label>
                    <div class="layui-input-inline">
                      <input type="text" name="latitude" lay-verify="required" placeholder="Enter latitude" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
<div class="layui-form-item">
                    <label class="layui-form-label">Longitude</label>
                    <div class="layui-input-inline">
                      <input type="text" name="longitude" lay-verify="required" placeholder="Enter longitude" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">Save</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit", function (e) {
            e.preventDefault();
            createAddressPost();
        });
    break;
  }
});
});
function editAddressPost(){
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
    var streetName = inputs[0].value;
    var streetAddress = inputs[1].value;
    var city = inputs[2].value;
    var country = inputs[3].value;
    var zipCode = inputs[4].value;
    var latitude = inputs[5].value;
    var longitude = inputs[6].value;
    $.ajax({
        type: "post",
        url: `http://localhost:3001/addresses/${id}`,
        data: {
            "streetName": streetName, "streetAddress": streetAddress, "city": city, "country": country, "zipCode": zipCode, "latitude": latitude, "longitude": longitude
        },
        dataType: "json",
        success: function (data) {
            if (data.code === 1){
                layer.closeAll();
                layer.msg("Address updated");
                table.reload('test', {
  //url: '/api/table/search'
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});
                //$('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
        }
    });
}

function deleteAddressPost() {
    $.ajax({
        type: "get",
        url: `http://localhost:3001/deleteAddress/${id}`,
        dataType: "json",
        success: function (data) {
            if (data.code === 1) {
                layer.closeAll();
                layer.msg("Address deleted");
                table.reload('test', { 
  //url: '/api/table/search'
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});         
            
}
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}

function createAddressPost(){
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
     var streetName = inputs[0].value;
    var streetAddress = inputs[1].value;
    var city = inputs[2].value;
    var country = inputs[3].value;
    var zipCode = inputs[4].value;
    var latitude = inputs[5].value;
    var longitude = inputs[6].value;
	$.ajax({
        type: "post",
        url: `http://localhost:3001/addresses`,
        data: {
            "streetName": streetName, "streetAddress": streetAddress, "city": city, "country": country, "zipCode": zipCode, "latitude": latitude, "longitude": longitude
        },
        dataType: "json",
        success: function (data) {
            if (data.code === 1){
                layer.closeAll();
                layer.msg("Address created");
                //$('#dg').datagrid('reload');
                 table.reload('test', {
  //url: '/api/table/search'
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});
            
}
        },
        error: function (item, err) {
        }
    });
}

function searchAddress(){
    var searchTerm = document.getElementById('inputSearchAddress').value;
    var searchTermFinal = "";
    if (searchTerm !== ""){
        searchTermFinal = searchTerm;
    }
    /*$("#dg").datagrid({
        url: `http://localhost:8080/searchAddress?term=${searchTermFinal}`,
        method: 'get',
        onLoadSuccess: function (data) {
        }*/
   table.reload('test', {
  	url: `http://localhost:3001/searchAddress?term=${searchTermFinal}`
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});


}
