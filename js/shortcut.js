(function(){
    var timer,
        source  = null,
        $elem   = {},
        html    = 'data:text/html;charset=utf-8,%3C%21DOCTYPE%20html%3E%3Chtml%20lang%3D%22ja%22%3E%3Chead%3E%3Ctitle%3Eapp_title%3C/title%3E%3Cmeta%20charset%3D%22UTF-8%22%3E%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2Cinitial-scale%3D1.0%2Cmaximum-scale%3D1.0%2Cminimum-scale%3D1.0%2Cuser-scalable%3Dno%22%3E%3Cmeta%20name%3D%22apple-mobile-web-app-capable%22%20content%3D%22yes%22%3E%3Cmeta%20name%3D%22apple-mobile-web-app-status-bar-style%22%20content%3D%22black%22%3E%3Cmeta%20name%3D%22viewport%22%20content%3D%22initial-scale%3D1.0%22%3E%3Cscript%3Eif%20%28window.navigator.standalone%29%20%7Blocation.href%3D%22app_url_scheme%22%3B%7D%3C/script%3E%3Clink%20rel%3D%22apple-touch-icon%22%20href%3D%22https%3A//zafiel.wingall.com/tools/shortcutter/img/app_name_apple-touch-icon.png%22%3E%3Clink%20rel%3D%22stylesheet%22%20href%3D%22https%3A//zafiel.wingall.com/tools/shortcutter/css/shortcut.css%22%20type%3D%22text/css%22%20media%3D%22all%22%3E%3C/head%3E%3Cbody%3E%3Cheader%20class%3D%22title%22%3E%3Ch1%3E%22app_title%22という名前で%3Cbr%3Eショートカットを作成します%3C/h1%3E%3C/header%3E%3Csection%20class%3D%22logo%22%3E%3Cimg%20src%3D%22https%3A//zafiel.wingall.com/tools/shortcutter/img/app_name_logo.png%22%20width%3D%2290%22%20height%2290%22%20alt%3D%22app_icon%22%3E%3C/section%3E%3Csection%20class%3D%22description%22%3E%3Cp%3E上記アイコンがホーム画面に追加されます%3C/p%3E%3C/section%3E%3Cnav%3E%3Cp%20class%3D%22arrow_box%22%3Eショートカット作成方法%3Cbr%3E下のアイコンをタップして「ホーム画面に追加」を選択してください%3C/p%3E%3C/nav%3E%3C/body%3E%3C/html%3E',
        scheme  = {
            evernote : {
                pattern : /https:\/\/www\.evernote\.com\/shard\/([a-z0-9]+)\/nl\/([0-9]+)\/([a-z0-9\-]+)\//,
                create  : function(url) {

                    var matcher = url.match(this.pattern);
                    if (matcher == null) {
                        return null;
                    }

                    var shardId = matcher[1],
                        userId  = matcher[2],
                        noteId  = matcher[3];
                        
                    return 'evernote:///view/%userId/%shardId/%noteId/%noteId/%noteId/'.replace('%userId', userId).replace('%shardId', shardId).replace(/%noteId/g, noteId);
                }
            }
    };

    var start       = function() {
        var url = null;
        timer   = setInterval(function(){
            var string  = $elem.textarea.val();
            if (string == url) { return; }

            var appName     = $elem.app.val();
            if (!scheme[appName]) { return disableButton(); }

            var appTitle    = $elem.shortcut.val();
            if (!appTitle) { return disableButton(); }

            var urlScheme   = scheme[appName].create(string);
            if (!urlScheme) { return disableButton(); }

            var appTitle    = $elem.shortcut.val();
            createHtml(appName, appTitle, urlScheme);
            url = string;
        }, 300);
    };

    var disableButton   = function() {
        source  = null;
        $elem.button.css({'background-color' : '#D1F1CC'});
    };

    var createHtml  = function(appName, appTitle, urlScheme) {
        source  = html.replace(/app_name/g, appName);
        source  = source.replace(/app_title/g, appTitle);
        source  = source.replace(/app_url_scheme/g, urlScheme);

        $elem.button.css({'background-color' : '#23AC0E'});
    };

    $(function(){
        $elem.textarea  = $('#textarea');
        $elem.button    = $('#button');
        $elem.app       = $('input[name="app_name"]');
        $elem.shortcut  = $('#shortcut_name');

        $elem.button.on({
            click   : function(e) {
                e.preventDefault();
                if (source == null) {return;}

                window.location.href = source;
            }
        });

        start();
    });
})();
