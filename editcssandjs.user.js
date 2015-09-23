// ==UserScript==
// @id             Edit CSS and JS
// @name           Edit CSS and JS
// @version        1.0
// @namespace      nimishjha.com
// @author         Nimish Jha
// @description    
// @include        *
// @run-at         document-end
// ==/UserScript==

var commandhistory = 'function get(s) { var t = s.toString().substr(1, s.length - 1); if (s.indexOf("#") === 0) return document.getElementById(t); else if (s.indexOf(".") === 0) return document.getElementsByClassName(t); else if (document.getElementsByTagName(s).length) return document.getElementsByTagName(s); else return 0; } function isArray(o) { return Object.prototype.toString.call(o) === "[object Array]"; } function del(c) { var todel = []; if (isArray(c)) { for (var i = 0; i < c.length; i++) { del(c[i]); } } else { var f = get(c); if (f && f.length) { for (var j = 0; j < f.length; j++) todel.push(f[j]); for (j = todel.length - 1; j > -1; j--) todel[j].parentNode.removeChild(todel[j]); } else if (f) { if (f.parentNode) f.parentNode.removeChild(f); } } } function forAll(selector, callback) { var e = get(selector); var i = e.length; while (i--) { callback(e[i]); } } function xlog(str) { d = document.createElement("h1"); d.innerHTML = str; document.body.insertBefore(d, document.body.firstChild); } function ac(obj1, obj2) { obj1.appendChild(obj2); } function ce(s) { return document.createElement(s); } function isIn(elem, list) { for (i = 0; i < list.length; i++) { if (elem == list[i]) { return true; } } return false; } function replace(e1, e2) { var e = get(e1); if (e.length) { var toreplace = []; for (var i = 0, ii = e.length; i < ii; i++) { toreplace.push(e[i]); } for (i = toreplace.length - 1; i >= 0; i--) { var replacement = document.createElement(e2); replacement.innerHTML = toreplace[i].innerHTML; toreplace[i].parentNode.replaceChild(replacement, toreplace[i]); } } } var db = document.body; Element.prototype.hasClass = function (s) { return this.className.match(new RegExp("(\\s|^)" + s + "(\\s|$)")); }; Element.prototype.addClass = function (s) { if (!this.hasClass(s)) this.className += " " + s; }; Element.prototype.removeClass = function (s) { if (this.hasClass(s)) { var reg = new RegExp("(\\s|^)" + s + "(\\s|$)"); this.className = this.className.replace(reg, " "); } };';

function isArray(o)
{
	return Object.prototype.toString.call(o) === '[object Array]';
}
function get(s)
{
	t = s.substr(1, s.length - 1);
	if(s.indexOf("#") == 0) return document.getElementById(t);
	else if(s.indexOf(".") == 0) return document.getElementsByClassName(t);
	else if(document.getElementsByTagName(s).length) return document.getElementsByTagName(s);
	else return false;
}
function del(c)
{
	todel = [];
	if(isArray(c))
	{
		for (i = 0; i < c.length; i++)
		{
			del(c[i]);
		}
	}
	else
	{
		f = get(c);
		if(f && f.length)
		{
			for (j = 0; j < f.length; j++) todel.push(f[j]);
			for (j = todel.length - 1; j > -1; j--) todel[j].parentNode.removeChild(todel[j]);
		}
		else if(f)
		{
			if(f.parentNode) f.parentNode.removeChild(f);
		}
	}
}
function delID(divid)
{
	if(f = document.getElementById(divid))
	{
		dummy = document.createTextNode("");
		f.parentNode.replaceChild(dummy, f)
	}
}
function getStyles()
{
	str = '';
	try
	{
		s = document.getElementsByTagName('style');
		for (i = 0; i < s.length; i++)
		{
			str += s[i].textContent;
		}
	}
	catch(e)
	{
		alert("error");
	}
	str = str.replace(/} /g, '}');
	str = str.replace(/}([^\n])/g, '}\n$1');
	return str;
}
function getInput(s)
{
	d = document.createElement('div');
	t = document.createElement('textarea');
	d.id = 'xxinput';
	t.id = 't';
	d.appendChild(t);
	document.body.appendChild(d);
	height = window.innerHeight - 500;
	if(s == 'style')
	{
		get('#xxinput').setAttribute("style", "position: fixed; top: 0; left: 0; width: 100%; height:" + height + "px;z-index: 1000000 !important; font: 12px verdcode !important; ");
	}
	else
	{
		get('#xxinput').setAttribute("style", "position: fixed; top: 0; left: 0; width: 100%; height:" + height + "px;z-index: 1000000 !important;  font: 12px verdcode !important; ");
	}
	get("#t").setAttribute("style", "width:100%;height:" + height + "px;background: rgba(0, 0, 0, 0.95) !important;color:#AAA !important;font:12px Verdcode, Consolas !important;border-style:solid !important; border-width: 20px !important; border-color: #000 !important; -moz-appearance: none !important; line-height: 150% !important; margin: 0; box-sizing: border-box !important; ");
	if(s == 'style')
	{
		get('#t').value = getStyles();
	}
	else
	{
		get("#t").value = commandhistory;
	}
	get("#t").focus();
	get("#t").setAttribute("onkeydown", "if(event.keyCode == 9){var iStart=this.selectionStart;var iEnd=this.selectionEnd;this.value=this.value.substr(0,iStart) + '\t' + this.value.substr(iEnd,this.value.length);this.setSelectionRange(iStart+1,iEnd+1);return false;}");
}

function ylog(str, elem, prepend)
{
	if (elem) var d = document.createElement(elem);
	else d = document.createElement("h6");
	d.className = "xlog";
	d.innerHTML = str;
	if(prepend)
		document.body.insertBefore(d, document.body.firstChild);
	else
		document.body.appendChild(d);
}

function applyStyle()
{
	var str;
	if(get("#t") !== null)
	{
		str = get('#t').value;
	}
	else
		ylog("could not get #t");
	del("style");
	insertStyle(str);
	del("#xxinput");
	window.focus();
}

function insertStyle(str, identifier)
{
	var head = get("head")[0], style = document.createElement("style"), rules = document.createTextNode(str);
	style.type = "text/css";
	if(style.styleSheet)
		style.styleSheet.cssText = rules.nodeValue;
	else
		style.appendChild(rules);
	if(identifier && identifier.length)
		style.id = identifier;
	head.appendChild(style);
}
function insertScript()
{
	s = get("#t").value;
	commandhistory = s;
	s = 'javascript: (function(){' + s + '})();';
	delID('xxinput');
	location.href = s;
	window.focus();
}
function keyHandler(e)
{
	e.stopPropagation();
	if(!e) var e = window.event;
	if(e.target)
	{
		targ = e.target;
	}
	k = e.keyCode;
	//if(e.altKey && e.ctrlKey)
	if(true)
	{
		switch (k)
		{
		case 112: //F1
			if(get('#t') !== null)
			{
				applyStyle();
			}
			else
			{
				getInput('style');
			}
			break;
		case 113: //F2
			if(get('#xxinput'))
			{
				insertScript();
			}
			else
			{
				getInput();
			}
			break;
		}
	}
}
function main()
{
	document.addEventListener("keyup", keyHandler, false);
}
main();
