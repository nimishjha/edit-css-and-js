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

var commandhistory = 'function get(s)\n{\n\tvar t = s.toString().substr(1, s.length - 1);\n\tif (s.indexOf("#") === 0) return document.getElementById(t);\n\telse if (s.indexOf(".") === 0) return document.getElementsByClassName(t);\n\telse if (document.getElementsByTagName(s).length) return document.getElementsByTagName(s);\n\telse return 0;\n}\nfunction isArray(o)\n{\n\treturn Object.prototype.toString.call(o) === "[object Array]";\n}\nfunction del(c)\n{\n\tvar todel = [];\n\tif (isArray(c))\n\t{\n\t\tfor (var i = 0; i < c.length; i++)\n\t\t{\n\t\t\tdel(c[i]);\n\t\t}\n\t}\n\telse\n\t{\n\t\tvar f = get(c);\n\t\tif (f && f.length)\n\t\t{\n\t\t\tfor (var j = 0; j < f.length; j++) todel.push(f[j]);\n\t\t\tfor (j = todel.length - 1; j > -1; j--) todel[j].parentNode.removeChild(todel[j]);\n\t\t}\n\t\telse if (f)\n\t\t{\n\t\t\tif (f.parentNode) f.parentNode.removeChild(f);\n\t\t}\n\t}\n}\nfunction forAll(selector, callback)\n{\n\tvar e = get(selector);\n\tvar i = e.length;\n\twhile (i--)\n\t{\n\t\tcallback(e[i]);\n\t}\n}\nfunction xlog(str)\n{\n\td = document.createElement("h1");\n\td.innerHTML = str;\n\tdocument.body.insertBefore(d, document.body.firstChild);\n}\nfunction ac(obj1, obj2)\n{\n\tobj1.appendChild(obj2);\n}\nfunction ce(s)\n{\n\treturn document.createElement(s);\n}\nfunction isIn(elem, list)\n{\n\tfor (i = 0; i < list.length; i++)\n\t{\n\t\tif (elem == list[i])\n\t\t{\n\t\t\treturn true;\n\t\t}\n\t}\n\treturn false;\n}\nfunction replace(e1, e2)\n{\n\tvar e = get(e1);\n\tif (e.length)\n\t{\n\t\tvar toreplace = [];\n\t\tfor (var i = 0, ii = e.length; i < ii; i++)\n\t\t{\n\t\t\ttoreplace.push(e[i]);\n\t\t}\n\t\tfor (i = toreplace.length - 1; i >= 0; i--)\n\t\t{\n\t\t\tvar replacement = document.createElement(e2);\n\t\t\treplacement.innerHTML = toreplace[i].innerHTML;\n\t\t\ttoreplace[i].parentNode.replaceChild(replacement, toreplace[i]);\n\t\t}\n\t}\n}\nvar db = document.body;\nElement.prototype.hasClass = function (s)\n{\n\treturn this.className.match(new RegExp("(\\s|^)" + s + "(\\s|$)"));\n};\nElement.prototype.addClass = function (s)\n{\n\tif (!this.hasClass(s)) this.className += " " + s;\n};\nElement.prototype.removeClass = function (s)\n{\n\tif (this.hasClass(s))\n\t{\n\t\tvar reg = new RegExp("(\\s|^)" + s + "(\\s|$)");\n\t\tthis.className = this.className.replace(reg, " ");\n\t}\n};\nfunction f(x)\n{\n\n}';

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
