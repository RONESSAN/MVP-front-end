//================ MENU CADASTRO ================.
$('.cadastro').click(function(){
    $('.menuLateral ul .itensCadastro').toggleClass('mostra');
});
$('.abreMenu').click(function(){
    $('.menuLateral').toggleClass('mostra');
});
$('.fechaMenu').click(function(){
    $('.menuLateral').toggleClass('mostra');
});

$('.cadastro').mouseover(function(){
    $('.menuLateral ul .seta1').toggleClass('gira');
})
$('.cadastro').mouseout(function(){
    $('.menuLateral ul .seta1').toggleClass('gira');
})

//================ MENU OPÇÕES ================.
$('.opcoes').click(function(){
    $('.menuLateral ul .itensOpcoes').toggleClass('mostra');
});
$('.opcoes').mouseover(function(){
    $('.menuLateral ul .seta2').toggleClass('gira');
})
$('.opcoes').mouseout(function(){
    $('.menuLateral ul .seta2').toggleClass('gira');
})


const $menuLateral = $('.menuLateral');
$(document).mouseup(e => {
    if( !$menuLateral.is(e.target) && $menuLateral.has(e.target).length === 0 ){
        $menuLateral.removeClass('mostra');
    }
});
