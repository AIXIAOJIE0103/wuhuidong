$(function () {

    load();

    //给文本框设置键盘落下事件
    $('#title').on('keydown', function (event) {

        //当前盘按下   13=回车键 
        if (event.keyCode == 13) {

            //创建一个变量用来保存读取本地储存中 todoList 里的数据
            var local = getDate();
            // console.log(local);

            //更新local  把文本框最新输入的内容添加给文本框
            local.push({
                name: $(this).val(),
                done: 'false',
            })
            //然后把最新保存的文本内容添加到本地保存里
            saveDate(local);
            load();

            $(this).val('');
        };
    });

    //给ol里的a标签设置点击事件
    $('ol').on('click', 'a', function () {

        //获取本地储存数据
        var arr = getDate();

        //拿到当前a标签的自定义属性   索引值
        var index = $(this).prop('id');

        //删除当前点击a标签对应的li标签
        arr.splice(index, 1);

        //把删除后的内容保存到本地存储
        saveDate(arr);

        //重新渲染页面
        load();

    });

    $('ol, ul').on('click', 'input', function () {

        //获取数据
        var arr = getDate();

        //拿到当前复选框的兄弟的索引值
        var index = $(this).siblings('a').attr('id');

        arr[index].done = $(this).prop('checked');

        var aa = arr[index];

        arr.splice(index,1);

        arr.push(aa);

        saveDate(arr);

        load();

    })
    //读取本地存储数据
    function getDate() {
        var date = localStorage.getItem('todoList');
        if (date == null) {
            return [];
        } else {
            return JSON.parse(date);
        }
    };

    //保存本地存储数据
    function saveDate(i) {
        localStorage.setItem('todoList', JSON.stringify(i))
        
    };

    //渲染页面
    function load() {

        //每次渲染前先清空之前创建的li标签
        $('ol, ul').empty();

        //获取本地存储内容
        var arr = getDate();

        //循环获取的内容
        $.each(arr, function (i, ele) {
            if (arr[i].done == true) {
                //创建li标签 , 添加到ol中
                $('ul').prepend(`<li>
                                    <input type="checkbox" checked>
                                    <p>${arr[i].name}</p>
                                    <a href="javascript:;" id =${i}></a>
                                </li>`);
            } else {
                //创建li标签 , 添加到ol中
                $('ol').prepend(`<li>
                                    <input type="checkbox">
                                    <p>${arr[i].name}</p>
                                    <a href="javascript:;" id =${i}></a>
                                    </li>`);
            };

        });


        $('#todocount').text($('ol li').length);
        $('#donecount').text($('ul li').length);
    };
});