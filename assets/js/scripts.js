$("input").attr("disabled", "disabled");

$('.input-group').click(function() {
    $(this).children("input").removeAttr('disabled');
    $(this).children("input").focus();
});

$(".menu-button").click(function() {
    $("nav").addClass("active");
});

$("nav, .nav link").click(function() {
    $("nav").removeClass("active");
});

$( document ).ready(function() {
    const token = "1544759088.7527346.835f4552c45c4d2698ce2c3b0d6a9d37";
    const userID = "1209777452";
    const url = "https://api.instagram.com/v1/users/self/media/recent/?access_token=1544759088.7527346.835f4552c45c4d2698ce2c3b0d6a9d37";

    $.ajax({
        method: "GET",
        url: url,
    }).done(function( response ) {
        const dataImgs = response.data;
        const images = [];

        for (var i in dataImgs) {
            if (dataImgs[i].hasOwnProperty("images")) {
                images.push({
                    text: dataImgs[i].caption.text,
                    likes: dataImgs[i].likes.count,
                    url: dataImgs[i].images.standard_resolution.url,
                })
            }
        }

        $("#loader").hide();
        $(".gallery-list").css("background", "#FFF");

        for (var i in images) {
            if (i < 9) {
                const img = images[i];
                img.text = (img.text.length > 60) ? img.text.substring(0, 150) + "..." : img.text;

                const html = `<div class="col-md-4" style="padding: 10px">
                    <a class="img-preview">
                        <img src="${img.url}" alt="Imagem ${i+1}">
                        <div class="preview-hover">
                            <p>${img.text}</p>
                            <p><i class="material-icons">thumb_up_alt</i>&nbsp; ${img.likes}</p>
                        </div>
                    </a>
                </div>`;
                $(".gallery-list").append(html);
            }
        }
    });
});
