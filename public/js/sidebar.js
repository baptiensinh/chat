//$('#sidebar-wrapper').hide();
//$("#search-sidebar").hide();
$("#wrapper").toggleClass("toggled");
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#menu-toggle-both").show();
 
    $("#search-navbar").show();

});
$("#menu-toggle-both").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#search-navbar").hide();
});
//**************************************
//$("#menu-toggle-both").hide();
$("#menu-toggle-both").click(function () {
    $("#menu-toggle-both").hide();
    $("#search-navbar").hide();
    //$('#sidebar-wrapper').show();
});