$(document).ready(function(){

    $('.cart-dropdown-btn').on('click', function() {
        $('.cart-dropdown').addClass('open');
    });

    $('.cart-close').on('click', function() {
        console.log('clicked');
        $('.cart-dropdown').removeClass('open');
    });

    $('form[action="/cart/add"]').on('submit', async function(e) {
        e.preventDefault();
        
        await fetch("cart/add", {
            method: "post",
            body: new FormData(this),
        });
        const res = await fetch("/cart.json");
        const cart = await res.json();
        $('.cart-count').html(cart.item_count);

        const cartDrawer = await fetch("/?section_id=mini-cart");
        const cartDrawerHTML = await cartDrawer.text();
        $('.cart-body-wrap').html(cartDrawerHTML);
        $('.cart-dropdown').addClass('open');
    });

    // Cart item quantity change
    $('.quantity-plus').on('click', function() {
        $(this).parent().find('.input-text.qty').trigger('stepUp').trigger('change');
    });

    $('.quantity-minus').on('click', function() {
        $(this).parent().find('.input-text.qty').trigger('stepDown').trigger('change');
    });

    // Search modal open
    $('.axil-search').on('click', function() {
        $('body, .header-search-modal').addClass('open');
        $('#closeMask').addClass('closeMask');

        setTimeout(function () {
            $('#prod-search').focus();
        }, 200);
    });

    // Search modal close
    $('.searchbar-close, #closeMask').on('click', function() {
        $('body, .header-search-modal').removeClass('open');
        $('#closeMask').removeClass('closeMask');
    });

    // Product search ajax
    var recent_product = $('.recent-product');
    $(document).on('input', '#prod-search', async function () {
        if (this.value.length <= 0) {
            $('.search-results-body').html(recent_product);
        } else if(this.value.length >= 3) {
            var keyword = $('#prod-search').val();

            const searchResult = await fetch("/?section_id=ajax-search-result");
            const searchResultHTML = await searchResult.text();
            $('.search-results-body').html(searchResultHTML);
            var url = window.location.href;
            if(url.indexOf('?') == -1) {
                var newURL = url+"?keyword="+keyword;
            }else {
                if(url.indexOf('keyword') != -1) {
                    var newURL = url.replace(/(keyword=)[^\&]+/, '$1' + keyword);
                }else {
                    var newURL = url+"&keyword="+keyword;
                }
            }
            history.pushState({}, null, newURL);
        }
    });

});
