// A very basic web server in node.js
// Stolen from: Node.js for Front-End Developers by Garann Means (p. 9-10)

/*this is without using Express.js and Morgan.js*/
/*for the "Express.js" version, see "webserver-express.js"*/


var port = 8000;
var serverUrl = "0.0.0.0";//"127.0.0.1"; //

var http = require("http"); //or, ("https") for secure
var path = require("path");
var fs = require("fs");
var checkMimeType = true;

console.log("Starting web server at " + serverUrl + ":" + port);

var isInit = 0;
http.createServer( function(req, res) //"req" is the request "res" = response (404, 500, etc.)
 {
 //it seems that only index.html is loading... how can I load "req" as well?
	var now = new Date();

	var filename = "/website/index.html" || path.basename(req.url);//req.url || "website/index.html"; //this is our main freaking problem. It does not navigate to the index.html
var ext = path.extname(filename); //console.log(path.basename(req.url) + " is the url" ); //req.url is now showing the proper url for each item
	var localPath = __dirname;
	var validExtensions = {
	
		".html" : "text/html",
		".js": "application/javascript",	
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png",
		".woff": "application/font-woff",
		".woff2": "application/font-woff2",		
		".eot" : "application/vnd.ms-fontobject",
		".ttf" : "application/x-font-ttf",
		".svg" : "image/svg+xml",
		".otf" : "font/opentype"
		
	};

	var validMimeType = true;
	var mimeType = validExtensions[ext];
	if (checkMimeType) {
		
		validMimeType = validExtensions[ext] != undefined; 	
		//console.log(checkMimeType + " chkmimetype is the result || " + validMimeType + " valid results" );
	}
	
	//below only identifies the index.html. how can we make it dynamic
	if (validMimeType) {
		
		//initially should be index.html. Consecutive requests should be for the other filetypes!		
		if (req.url == '/'){
			filename = "/website/index.html"
		}else{
			filename = "/website/" + req.url;
			mimeType = validExtensions[path.extname(filename)];
		}
		
		localPath += filename; //console.log("---//localpath is now " + localPath);

		fs.exists(localPath, function(exists) {
			if(exists) {
				console.log("Serving file: " + req.url); //console.log("Serving file: " + localPath);
				getFile(localPath, res, mimeType); console.log(mimeType + " is the mimetype"); //mimeType is constantly text/html
			} else {
				console.log("File not found: " + localPath);
				res.writeHead(404);
				res.end();
			}
		});
		
		

	} else {
		console.log("Invalid file extension detected!!!: " + ext + " (" + filename + ")")
	}

}).listen(port, serverUrl);

function getFile(localPath, res, mimeType) {

	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			if (mimeType != undefined) {
				res.setHeader("Content-Type", mimeType);
			}
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
	
}



/*
all available filetypes

"3gp"   : "video/3gpp"
        , "a"     : "application/octet-stream"
        , "ai"    : "application/postscript"
        , "aif"   : "audio/x-aiff"
        , "aiff"  : "audio/x-aiff"
        , "asc"   : "application/pgp-signature"
        , "asf"   : "video/x-ms-asf"
        , "asm"   : "text/x-asm"
        , "asx"   : "video/x-ms-asf"
        , "atom"  : "application/atom+xml"
        , "au"    : "audio/basic"
        , "avi"   : "video/x-msvideo"
        , "bat"   : "application/x-msdownload"
        , "bin"   : "application/octet-stream"
        , "bmp"   : "image/bmp"
        , "bz2"   : "application/x-bzip2"
        , "c"     : "text/x-c"
        , "cab"   : "application/vnd.ms-cab-compressed"
        , "cc"    : "text/x-c"
        , "chm"   : "application/vnd.ms-htmlhelp"
        , "class"   : "application/octet-stream"
        , "com"   : "application/x-msdownload"
        , "conf"  : "text/plain"
        , "cpp"   : "text/x-c"
        , "crt"   : "application/x-x509-ca-cert"
        , "css"   : "text/css"
        , "csv"   : "text/csv"
        , "cxx"   : "text/x-c"
        , "deb"   : "application/x-debian-package"
        , "der"   : "application/x-x509-ca-cert"
        , "diff"  : "text/x-diff"
        , "djv"   : "image/vnd.djvu"
        , "djvu"  : "image/vnd.djvu"
        , "dll"   : "application/x-msdownload"
        , "dmg"   : "application/octet-stream"
        , "doc"   : "application/msword"
        , "dot"   : "application/msword"
        , "dtd"   : "application/xml-dtd"
        , "dvi"   : "application/x-dvi"
        , "ear"   : "application/java-archive"
        , "eml"   : "message/rfc822"
        , "eps"   : "application/postscript"
        , "exe"   : "application/x-msdownload"
        , "f"     : "text/x-fortran"
        , "f77"   : "text/x-fortran"
        , "f90"   : "text/x-fortran"
        , "flv"   : "video/x-flv"
        , "for"   : "text/x-fortran"
        , "gem"   : "application/octet-stream"
        , "gemspec" : "text/x-script.ruby"
        , "gif"   : "image/gif"
        , "gz"    : "application/x-gzip"
        , "h"     : "text/x-c"
        , "hh"    : "text/x-c"
        , "htm"   : "text/html"
        , "html"  : "text/html"
        , "ico"   : "image/vnd.microsoft.icon"
        , "ics"   : "text/calendar"
        , "ifb"   : "text/calendar"
        , "iso"   : "application/octet-stream"
        , "jar"   : "application/java-archive"
        , "java"  : "text/x-java-source"
        , "jnlp"  : "application/x-java-jnlp-file"
        , "jpeg"  : "image/jpeg"
        , "jpg"   : "image/jpeg"
        , "js"    : "application/javascript"
        , "json"  : "application/json"
        , "log"   : "text/plain"
        , "m3u"   : "audio/x-mpegurl"
        , "m4v"   : "video/mp4"
        , "man"   : "text/troff"
        , "mathml"  : "application/mathml+xml"
        , "mbox"  : "application/mbox"
        , "mdoc"  : "text/troff"
        , "me"    : "text/troff"
        , "mid"   : "audio/midi"
        , "midi"  : "audio/midi"
        , "mime"  : "message/rfc822"
        , "mml"   : "application/mathml+xml"
        , "mng"   : "video/x-mng"
        , "mov"   : "video/quicktime"
        , "mp3"   : "audio/mpeg"
        , "mp4"   : "video/mp4"
        , "mp4v"  : "video/mp4"
        , "mpeg"  : "video/mpeg"
        , "mpg"   : "video/mpeg"
        , "ms"    : "text/troff"
        , "msi"   : "application/x-msdownload"
        , "odp"   : "application/vnd.oasis.opendocument.presentation"
        , "ods"   : "application/vnd.oasis.opendocument.spreadsheet"
        , "odt"   : "application/vnd.oasis.opendocument.text"
        , "ogg"   : "application/ogg"
        , "p"     : "text/x-pascal"
        , "pas"   : "text/x-pascal"
        , "pbm"   : "image/x-portable-bitmap"
        , "pdf"   : "application/pdf"
        , "pem"   : "application/x-x509-ca-cert"
        , "pgm"   : "image/x-portable-graymap"
        , "pgp"   : "application/pgp-encrypted"
        , "pkg"   : "application/octet-stream"
        , "pl"    : "text/x-script.perl"
        , "pm"    : "text/x-script.perl-module"
        , "png"   : "image/png"
        , "pnm"   : "image/x-portable-anymap"
        , "ppm"   : "image/x-portable-pixmap"
        , "pps"   : "application/vnd.ms-powerpoint"
        , "ppt"   : "application/vnd.ms-powerpoint"
        , "ps"    : "application/postscript"
        , "psd"   : "image/vnd.adobe.photoshop"
        , "py"    : "text/x-script.python"
        , "qt"    : "video/quicktime"
        , "ra"    : "audio/x-pn-realaudio"
        , "rake"  : "text/x-script.ruby"
        , "ram"   : "audio/x-pn-realaudio"
        , "rar"   : "application/x-rar-compressed"
        , "rb"    : "text/x-script.ruby"
        , "rdf"   : "application/rdf+xml"
        , "roff"  : "text/troff"
        , "rpm"   : "application/x-redhat-package-manager"
        , "rss"   : "application/rss+xml"
        , "rtf"   : "application/rtf"
        , "ru"    : "text/x-script.ruby"
        , "s"     : "text/x-asm"
        , "sgm"   : "text/sgml"
        , "sgml"  : "text/sgml"
        , "sh"    : "application/x-sh"
        , "sig"   : "application/pgp-signature"
        , "snd"   : "audio/basic"
        , "so"    : "application/octet-stream"
        , "svg"   : "image/svg+xml"
        , "svgz"  : "image/svg+xml"
        , "swf"   : "application/x-shockwave-flash"
        , "t"     : "text/troff"
        , "tar"   : "application/x-tar"
        , "tbz"   : "application/x-bzip-compressed-tar"
        , "tcl"   : "application/x-tcl"
        , "tex"   : "application/x-tex"
        , "texi"  : "application/x-texinfo"
        , "texinfo" : "application/x-texinfo"
        , "text"  : "text/plain"
        , "tif"   : "image/tiff"
        , "tiff"  : "image/tiff"
        , "torrent" : "application/x-bittorrent"
        , "tr"    : "text/troff"
        , "txt"   : "text/plain"
        , "vcf"   : "text/x-vcard"
        , "vcs"   : "text/x-vcalendar"
        , "vrml"  : "model/vrml"
        , "war"   : "application/java-archive"
        , "wav"   : "audio/x-wav"
        , "wma"   : "audio/x-ms-wma"
        , "wmv"   : "video/x-ms-wmv"
        , "wmx"   : "video/x-ms-wmx"
        , "wrl"   : "model/vrml"
        , "wsdl"  : "application/wsdl+xml"
        , "xbm"   : "image/x-xbitmap"
        , "xhtml"   : "application/xhtml+xml"
        , "xls"   : "application/vnd.ms-excel"
        , "xml"   : "application/xml"
        , "xpm"   : "image/x-xpixmap"
        , "xsl"   : "application/xml"
        , "xslt"  : "application/xslt+xml"
        , "yaml"  : "text/yaml"
        , "yml"   : "text/yaml"
        , "zip"   : "application/zip",
        ".html" : "text/html",          
        ".js": "application/javascript", 
        ".css": "text/css",
        ".txt": "text/plain",
        '.svg' : 'image/svg+xml',
        '.woff' : 'application/font-woff',
        '.woff2' : 'application/font-woff2',
        '.md' : 'text/x-markdown',
        '.otf' : 'font/opentype',
        ".jpg": "image/jpeg",
        'json':'application/json',
        '.ttf': 'application/x-font-ttf',
        '.scss' : 'text/x-scss',
        '.markdown' : 'text/x-markdown',
        '.rtf' : 'application/rtf',
        '.types' : 'application/octet-stream',
        '.eot' : 'application/vnd.ms-fontobject',       
        ".gif": "image/gif",
        '.htc' : 'text/x-component',
        '.js.orig' : 'application/octet-stream',
        'js.rej' : 'application/octet-stream',
        ".png": "image/png"
*/