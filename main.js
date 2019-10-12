$(document).ready(()=>{
    $('.banner-slide').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        dots: true,
        fade: true,
    });
});

//expand an item content, hide other items - 安心留学プラン用
$('#btn-plan').on('click', ()=>{

    $('.item__cover__content .btn').fadeOut();
    
    $('.item__cover__content').fadeOut(0, ()=>{
        $('.item__cover__title').fadeOut(0, ()=>{
            $('.item:not(:nth-child(1))').css("flex", "0 0 0%").fadeOut();
            $('#study-plan').css("flex", "0 0 100%");
            $('.item__content-plan').fadeIn();
            $('.item__content-plan').css('display', 'flex');
            
        });
    });
    $('.cancel-btn').removeClass("hide");
    
    
   
    
});

//expand an item content, hide other items - ４年制用
$('#btn-uni').on('click', ()=>{

    
    $('.item__cover__content .btn').fadeOut();
        

    $('.item__cover__content').fadeOut(0,()=>{
        $('.item__cover__title').fadeOut(0, ()=> {
            $('.item:not(:nth-child(2))').css("flex", "0 0 0%").fadeOut();
            $('#university').css("flex", "0 0 100%");
            $('.item__content-uni').fadeIn();
            $('.item__content-uni').css('display', 'flex');
            
        });
    });
    $('.cancel-btn').removeClass("hide");

    
});

//expand an item content, hide other items - 2年制用
$('#btn-community').on('click', ()=>{
    $('.item__cover__content .btn').fadeOut();

    $('.item__cover__content').fadeOut(0,()=>{
        $('.item__cover__title').fadeOut(0, ()=> {
            $('.item:not(:nth-child(3))').css("flex", "0 0 0%").fadeOut();
            $('#community-college').css("flex", "0 0 100%");
            $('.item__content-community').fadeIn();
            $('.item__content-community').css('display', 'flex');
            
        });
    });
    $('.cancel-btn').removeClass("hide");

});


//return to the original state
$('.cancel-btn').on('click', () => {
    hideItem();
});

/*
$('body').click((e) => {    
    if(e.target.id == "item__content-community" || e.target.id == "item__content-uni" || e.target.id == "item__content-plan")
       return;
   //Do processing of click event here for every element except with id menu_content
    hideItem();
});
*/



let hideItem = () => {
    $('.cancel-btn').addClass('hide');
    $('.item').fadeIn();
    $('.item').css("flex", "0 0 33.333%");
    $('.item__content').fadeOut();
    setTimeout(()=>{
        $('.item__cover__title').fadeIn();
        $('.item__cover__content').fadeIn();
        $('.item__cover:before').fadeIn();
        $('.item__cover__content .btn').fadeIn();
    }, 500);
};

//scrolling function, make 'to top' symbol appear when the page is scrolled down

window.addEventListener('scroll', () => {
    scrollDetection();
});

let scrollDetection = () => {
    if(pageYOffset > 400) {
        $('.to-top').removeClass('slide-up');
        $('.to-top').addClass('slide-down');
    } else if (pageYOffset < 400) {
        $('.to-top').removeClass('slide-down');
        $('.to-top').addClass('slide-up');
    }
};

//collapse nav

$('.burger').on('click', ()=> {
    $('.burger div').toggleClass('arrow');
   
    $('.nav__list').toggleClass('collapse');
    $('.nav__list__item').toggleClass('collapse');
    $('.nav').toggleClass('shortened');
});
