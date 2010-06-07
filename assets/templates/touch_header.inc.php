<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>MJaxTouch &beta;</title>
        
        <style type="text/css" media="screen">@import "<?php _p(__VIRTUAL_DIRECTORY__ . __CSS_ASSETS__); ?>/_core/jqtouch/jqtouch.css";</style>
        <style type="text/css" media="screen">@import "<?php _p(__VIRTUAL_DIRECTORY__ . __THEME_ASSETS__); ?>/jqt/theme.min.css";</style>
        <script src="<?php _p(__VIRTUAL_DIRECTORY__ . __JS_ASSETS__); ?>/_core/jqtouch/jquery.1.3.2.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="<?php _p(__VIRTUAL_DIRECTORY__ . __JS_ASSETS__); ?>/_core/jqtouch/jqtouch.js" type="application/x-javascript" charset="utf-8"></script>
        <script src="<?php _p(__VIRTUAL_DIRECTORY__ . __JS_ASSETS__); ?>/_core/MJaxTouch.js" type="application/x-javascript" charset="utf-8"></script>
        <script type="text/javascript" charset="utf-8">
            <?php $this->objConfig->Render(); ?>
            $(document).ready(function(){
                MJaxTouch.Init();
            });
        </script>
         <style type="text/css" media="screen">
            body.fullscreen #home .info {
                display: none;
            }
           
            a {
                color: #fff;
                font-weight: bold;
                text-decoration: none;
            }
        </style>
    </head>
    <body>