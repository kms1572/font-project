function getCookie(name) { // csrftoken 문제 해결 
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// 댓글 저장 js
function comment_save(post){
    var comment_post_id = post; // 해당 게시물 pk
    var comment_name = $('#id_comment_name'+post).val();  // 댓글 작성자이름
    var comment_password = $('#id_comment_password'+post).val(); // 댓글 비밀번호
    var comment_content = $('#id_comment_content'+post).val(); // 댓글 내용
    var csrftoken = getCookie('csrftoken');
    if(comment_name == ""){
        alert('이름을 입력해주세요.');
        return false;
    } else if(comment_password == "") {
        alert('비밀번호를 입력해주세요.');
        return false;
    } else if(comment_content == "") {
        alert('내용을 입력해주세요.');
        return false;
    } else if(comment_password.length < 4) {
        alert('4자리 이상 입력해주세요.');
        return false;
    }
    $.ajax({
        type: 'POST',
        url: '/comment_save/',
        data : {
            'post':comment_post_id,
            'comment_name':comment_name,
            'comment_password':comment_password,
            'comment_content':comment_content,
        },
        headers:{'X-CSRFToken':csrftoken},
        success: function(result) { // input에 입력한 내용 지움
            document.getElementById('id_comment_name'+post).value = null;
            document.getElementById('id_comment_password'+post).value = null;
            document.getElementById('id_comment_content'+post).value = null;
            comment_show(post);
        }
    });
}


// 댓글 출력 js
function comment_show(post){
    var comment_post_id = post;
    var comment_name = $('#id_comment_name'+post).val();
    var comment_password = $('#id_comment_password'+post).val();
    var comment_content = $('#id_comment_content'+post).val();
    var csrftoken2 = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: '/comment_show/',
        data : {
            'post':comment_post_id,
            'comment_name':comment_name,
            'comment_password':comment_password,
            'comment_content':comment_content,
        },
        headers:{'X-CSRFToken':csrftoken2},
        success: function(response) {
            $("#comment"+post).html(response);
        }
    });
}
