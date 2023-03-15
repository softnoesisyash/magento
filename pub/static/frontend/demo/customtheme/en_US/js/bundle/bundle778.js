require.config({"config": {
        "jsbuild":{"jquery/ui-modules/widgets/tabs.js":"/*!\n * jQuery UI Tabs 1.13.1\n * http://jqueryui.com\n *\n * Copyright jQuery Foundation and other contributors\n * Released under the MIT license.\n * http://jquery.org/license\n */\n\n//>>label: Tabs\n//>>group: Widgets\n//>>description: Transforms a set of container elements into a tab structure.\n//>>docs: http://api.jqueryui.com/tabs/\n//>>demos: http://jqueryui.com/tabs/\n//>>css.structure: ../../themes/base/core.css\n//>>css.structure: ../../themes/base/tabs.css\n//>>css.theme: ../../themes/base/theme.css\n\n( function( factory ) {\n\t\"use strict\";\n\n\tif ( typeof define === \"function\" && define.amd ) {\n\n\t\t// AMD. Register as an anonymous module.\n\t\tdefine( [\n\t\t\t\"jquery\",\n\t\t\t\"../keycode\",\n\t\t\t\"../safe-active-element\",\n\t\t\t\"../unique-id\",\n\t\t\t\"../version\",\n\t\t\t\"../widget\"\n\t\t], factory );\n\t} else {\n\n\t\t// Browser globals\n\t\tfactory( jQuery );\n\t}\n} )( function( $ ) {\n\"use strict\";\n\n$.widget( \"ui.tabs\", {\n\tversion: \"1.13.1\",\n\tdelay: 300,\n\toptions: {\n\t\tactive: null,\n\t\tclasses: {\n\t\t\t\"ui-tabs\": \"ui-corner-all\",\n\t\t\t\"ui-tabs-nav\": \"ui-corner-all\",\n\t\t\t\"ui-tabs-panel\": \"ui-corner-bottom\",\n\t\t\t\"ui-tabs-tab\": \"ui-corner-top\"\n\t\t},\n\t\tcollapsible: false,\n\t\tevent: \"click\",\n\t\theightStyle: \"content\",\n\t\thide: null,\n\t\tshow: null,\n\n\t\t// Callbacks\n\t\tactivate: null,\n\t\tbeforeActivate: null,\n\t\tbeforeLoad: null,\n\t\tload: null\n\t},\n\n\t_isLocal: ( function() {\n\t\tvar rhash = /#.*$/;\n\n\t\treturn function( anchor ) {\n\t\t\tvar anchorUrl, locationUrl;\n\n\t\t\tanchorUrl = anchor.href.replace( rhash, \"\" );\n\t\t\tlocationUrl = location.href.replace( rhash, \"\" );\n\n\t\t\t// Decoding may throw an error if the URL isn't UTF-8 (#9518)\n\t\t\ttry {\n\t\t\t\tanchorUrl = decodeURIComponent( anchorUrl );\n\t\t\t} catch ( error ) {}\n\t\t\ttry {\n\t\t\t\tlocationUrl = decodeURIComponent( locationUrl );\n\t\t\t} catch ( error ) {}\n\n\t\t\treturn anchor.hash.length > 1 && anchorUrl === locationUrl;\n\t\t};\n\t} )(),\n\n\t_create: function() {\n\t\tvar that = this,\n\t\t\toptions = this.options;\n\n\t\tthis.running = false;\n\n\t\tthis._addClass( \"ui-tabs\", \"ui-widget ui-widget-content\" );\n\t\tthis._toggleClass( \"ui-tabs-collapsible\", null, options.collapsible );\n\n\t\tthis._processTabs();\n\t\toptions.active = this._initialActive();\n\n\t\t// Take disabling tabs via class attribute from HTML\n\t\t// into account and update option properly.\n\t\tif ( Array.isArray( options.disabled ) ) {\n\t\t\toptions.disabled = $.uniqueSort( options.disabled.concat(\n\t\t\t\t$.map( this.tabs.filter( \".ui-state-disabled\" ), function( li ) {\n\t\t\t\t\treturn that.tabs.index( li );\n\t\t\t\t} )\n\t\t\t) ).sort();\n\t\t}\n\n\t\t// Check for length avoids error when initializing empty list\n\t\tif ( this.options.active !== false && this.anchors.length ) {\n\t\t\tthis.active = this._findActive( options.active );\n\t\t} else {\n\t\t\tthis.active = $();\n\t\t}\n\n\t\tthis._refresh();\n\n\t\tif ( this.active.length ) {\n\t\t\tthis.load( options.active );\n\t\t}\n\t},\n\n\t_initialActive: function() {\n\t\tvar active = this.options.active,\n\t\t\tcollapsible = this.options.collapsible,\n\t\t\tlocationHash = location.hash.substring( 1 );\n\n\t\tif ( active === null ) {\n\n\t\t\t// check the fragment identifier in the URL\n\t\t\tif ( locationHash ) {\n\t\t\t\tthis.tabs.each( function( i, tab ) {\n\t\t\t\t\tif ( $( tab ).attr( \"aria-controls\" ) === locationHash ) {\n\t\t\t\t\t\tactive = i;\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t} );\n\t\t\t}\n\n\t\t\t// Check for a tab marked active via a class\n\t\t\tif ( active === null ) {\n\t\t\t\tactive = this.tabs.index( this.tabs.filter( \".ui-tabs-active\" ) );\n\t\t\t}\n\n\t\t\t// No active tab, set to false\n\t\t\tif ( active === null || active === -1 ) {\n\t\t\t\tactive = this.tabs.length ? 0 : false;\n\t\t\t}\n\t\t}\n\n\t\t// Handle numbers: negative, out of range\n\t\tif ( active !== false ) {\n\t\t\tactive = this.tabs.index( this.tabs.eq( active ) );\n\t\t\tif ( active === -1 ) {\n\t\t\t\tactive = collapsible ? false : 0;\n\t\t\t}\n\t\t}\n\n\t\t// Don't allow collapsible: false and active: false\n\t\tif ( !collapsible && active === false && this.anchors.length ) {\n\t\t\tactive = 0;\n\t\t}\n\n\t\treturn active;\n\t},\n\n\t_getCreateEventData: function() {\n\t\treturn {\n\t\t\ttab: this.active,\n\t\t\tpanel: !this.active.length ? $() : this._getPanelForTab( this.active )\n\t\t};\n\t},\n\n\t_tabKeydown: function( event ) {\n\t\tvar focusedTab = $( $.ui.safeActiveElement( this.document[ 0 ] ) ).closest( \"li\" ),\n\t\t\tselectedIndex = this.tabs.index( focusedTab ),\n\t\t\tgoingForward = true;\n\n\t\tif ( this._handlePageNav( event ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\tswitch ( event.keyCode ) {\n\t\tcase $.ui.keyCode.RIGHT:\n\t\tcase $.ui.keyCode.DOWN:\n\t\t\tselectedIndex++;\n\t\t\tbreak;\n\t\tcase $.ui.keyCode.UP:\n\t\tcase $.ui.keyCode.LEFT:\n\t\t\tgoingForward = false;\n\t\t\tselectedIndex--;\n\t\t\tbreak;\n\t\tcase $.ui.keyCode.END:\n\t\t\tselectedIndex = this.anchors.length - 1;\n\t\t\tbreak;\n\t\tcase $.ui.keyCode.HOME:\n\t\t\tselectedIndex = 0;\n\t\t\tbreak;\n\t\tcase $.ui.keyCode.SPACE:\n\n\t\t\t// Activate only, no collapsing\n\t\t\tevent.preventDefault();\n\t\t\tclearTimeout( this.activating );\n\t\t\tthis._activate( selectedIndex );\n\t\t\treturn;\n\t\tcase $.ui.keyCode.ENTER:\n\n\t\t\t// Toggle (cancel delayed activation, allow collapsing)\n\t\t\tevent.preventDefault();\n\t\t\tclearTimeout( this.activating );\n\n\t\t\t// Determine if we should collapse or activate\n\t\t\tthis._activate( selectedIndex === this.options.active ? false : selectedIndex );\n\t\t\treturn;\n\t\tdefault:\n\t\t\treturn;\n\t\t}\n\n\t\t// Focus the appropriate tab, based on which key was pressed\n\t\tevent.preventDefault();\n\t\tclearTimeout( this.activating );\n\t\tselectedIndex = this._focusNextTab( selectedIndex, goingForward );\n\n\t\t// Navigating with control/command key will prevent automatic activation\n\t\tif ( !event.ctrlKey && !event.metaKey ) {\n\n\t\t\t// Update aria-selected immediately so that AT think the tab is already selected.\n\t\t\t// Otherwise AT may confuse the user by stating that they need to activate the tab,\n\t\t\t// but the tab will already be activated by the time the announcement finishes.\n\t\t\tfocusedTab.attr( \"aria-selected\", \"false\" );\n\t\t\tthis.tabs.eq( selectedIndex ).attr( \"aria-selected\", \"true\" );\n\n\t\t\tthis.activating = this._delay( function() {\n\t\t\t\tthis.option( \"active\", selectedIndex );\n\t\t\t}, this.delay );\n\t\t}\n\t},\n\n\t_panelKeydown: function( event ) {\n\t\tif ( this._handlePageNav( event ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Ctrl+up moves focus to the current tab\n\t\tif ( event.ctrlKey && event.keyCode === $.ui.keyCode.UP ) {\n\t\t\tevent.preventDefault();\n\t\t\tthis.active.trigger( \"focus\" );\n\t\t}\n\t},\n\n\t// Alt+page up/down moves focus to the previous/next tab (and activates)\n\t_handlePageNav: function( event ) {\n\t\tif ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ) {\n\t\t\tthis._activate( this._focusNextTab( this.options.active - 1, false ) );\n\t\t\treturn true;\n\t\t}\n\t\tif ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ) {\n\t\t\tthis._activate( this._focusNextTab( this.options.active + 1, true ) );\n\t\t\treturn true;\n\t\t}\n\t},\n\n\t_findNextTab: function( index, goingForward ) {\n\t\tvar lastTabIndex = this.tabs.length - 1;\n\n\t\tfunction constrain() {\n\t\t\tif ( index > lastTabIndex ) {\n\t\t\t\tindex = 0;\n\t\t\t}\n\t\t\tif ( index < 0 ) {\n\t\t\t\tindex = lastTabIndex;\n\t\t\t}\n\t\t\treturn index;\n\t\t}\n\n\t\twhile ( $.inArray( constrain(), this.options.disabled ) !== -1 ) {\n\t\t\tindex = goingForward ? index + 1 : index - 1;\n\t\t}\n\n\t\treturn index;\n\t},\n\n\t_focusNextTab: function( index, goingForward ) {\n\t\tindex = this._findNextTab( index, goingForward );\n\t\tthis.tabs.eq( index ).trigger( \"focus\" );\n\t\treturn index;\n\t},\n\n\t_setOption: function( key, value ) {\n\t\tif ( key === \"active\" ) {\n\n\t\t\t// _activate() will handle invalid values and update this.options\n\t\t\tthis._activate( value );\n\t\t\treturn;\n\t\t}\n\n\t\tthis._super( key, value );\n\n\t\tif ( key === \"collapsible\" ) {\n\t\t\tthis._toggleClass( \"ui-tabs-collapsible\", null, value );\n\n\t\t\t// Setting collapsible: false while collapsed; open first panel\n\t\t\tif ( !value && this.options.active === false ) {\n\t\t\t\tthis._activate( 0 );\n\t\t\t}\n\t\t}\n\n\t\tif ( key === \"event\" ) {\n\t\t\tthis._setupEvents( value );\n\t\t}\n\n\t\tif ( key === \"heightStyle\" ) {\n\t\t\tthis._setupHeightStyle( value );\n\t\t}\n\t},\n\n\t_sanitizeSelector: function( hash ) {\n\t\treturn hash ? hash.replace( /[!\"$%&'()*+,.\\/:;<=>?@\\[\\]\\^`{|}~]/g, \"\\\\$&\" ) : \"\";\n\t},\n\n\trefresh: function() {\n\t\tvar options = this.options,\n\t\t\tlis = this.tablist.children( \":has(a[href])\" );\n\n\t\t// Get disabled tabs from class attribute from HTML\n\t\t// this will get converted to a boolean if needed in _refresh()\n\t\toptions.disabled = $.map( lis.filter( \".ui-state-disabled\" ), function( tab ) {\n\t\t\treturn lis.index( tab );\n\t\t} );\n\n\t\tthis._processTabs();\n\n\t\t// Was collapsed or no tabs\n\t\tif ( options.active === false || !this.anchors.length ) {\n\t\t\toptions.active = false;\n\t\t\tthis.active = $();\n\n\t\t// was active, but active tab is gone\n\t\t} else if ( this.active.length && !$.contains( this.tablist[ 0 ], this.active[ 0 ] ) ) {\n\n\t\t\t// all remaining tabs are disabled\n\t\t\tif ( this.tabs.length === options.disabled.length ) {\n\t\t\t\toptions.active = false;\n\t\t\t\tthis.active = $();\n\n\t\t\t// activate previous tab\n\t\t\t} else {\n\t\t\t\tthis._activate( this._findNextTab( Math.max( 0, options.active - 1 ), false ) );\n\t\t\t}\n\n\t\t// was active, active tab still exists\n\t\t} else {\n\n\t\t\t// make sure active index is correct\n\t\t\toptions.active = this.tabs.index( this.active );\n\t\t}\n\n\t\tthis._refresh();\n\t},\n\n\t_refresh: function() {\n\t\tthis._setOptionDisabled( this.options.disabled );\n\t\tthis._setupEvents( this.options.event );\n\t\tthis._setupHeightStyle( this.options.heightStyle );\n\n\t\tthis.tabs.not( this.active ).attr( {\n\t\t\t\"aria-selected\": \"false\",\n\t\t\t\"aria-expanded\": \"false\",\n\t\t\ttabIndex: -1\n\t\t} );\n\t\tthis.panels.not( this._getPanelForTab( this.active ) )\n\t\t\t.hide()\n\t\t\t.attr( {\n\t\t\t\t\"aria-hidden\": \"true\"\n\t\t\t} );\n\n\t\t// Make sure one tab is in the tab order\n\t\tif ( !this.active.length ) {\n\t\t\tthis.tabs.eq( 0 ).attr( \"tabIndex\", 0 );\n\t\t} else {\n\t\t\tthis.active\n\t\t\t\t.attr( {\n\t\t\t\t\t\"aria-selected\": \"true\",\n\t\t\t\t\t\"aria-expanded\": \"true\",\n\t\t\t\t\ttabIndex: 0\n\t\t\t\t} );\n\t\t\tthis._addClass( this.active, \"ui-tabs-active\", \"ui-state-active\" );\n\t\t\tthis._getPanelForTab( this.active )\n\t\t\t\t.show()\n\t\t\t\t.attr( {\n\t\t\t\t\t\"aria-hidden\": \"false\"\n\t\t\t\t} );\n\t\t}\n\t},\n\n\t_processTabs: function() {\n\t\tvar that = this,\n\t\t\tprevTabs = this.tabs,\n\t\t\tprevAnchors = this.anchors,\n\t\t\tprevPanels = this.panels;\n\n\t\tthis.tablist = this._getList().attr( \"role\", \"tablist\" );\n\t\tthis._addClass( this.tablist, \"ui-tabs-nav\",\n\t\t\t\"ui-helper-reset ui-helper-clearfix ui-widget-header\" );\n\n\t\t// Prevent users from focusing disabled tabs via click\n\t\tthis.tablist\n\t\t\t.on( \"mousedown\" + this.eventNamespace, \"> li\", function( event ) {\n\t\t\t\tif ( $( this ).is( \".ui-state-disabled\" ) ) {\n\t\t\t\t\tevent.preventDefault();\n\t\t\t\t}\n\t\t\t} )\n\n\t\t\t// Support: IE <9\n\t\t\t// Preventing the default action in mousedown doesn't prevent IE\n\t\t\t// from focusing the element, so if the anchor gets focused, blur.\n\t\t\t// We don't have to worry about focusing the previously focused\n\t\t\t// element since clicking on a non-focusable element should focus\n\t\t\t// the body anyway.\n\t\t\t.on( \"focus\" + this.eventNamespace, \".ui-tabs-anchor\", function() {\n\t\t\t\tif ( $( this ).closest( \"li\" ).is( \".ui-state-disabled\" ) ) {\n\t\t\t\t\tthis.blur();\n\t\t\t\t}\n\t\t\t} );\n\n\t\tthis.tabs = this.tablist.find( \"> li:has(a[href])\" )\n\t\t\t.attr( {\n\t\t\t\trole: \"tab\",\n\t\t\t\ttabIndex: -1\n\t\t\t} );\n\t\tthis._addClass( this.tabs, \"ui-tabs-tab\", \"ui-state-default\" );\n\n\t\tthis.anchors = this.tabs.map( function() {\n\t\t\treturn $( \"a\", this )[ 0 ];\n\t\t} )\n\t\t\t.attr( {\n\t\t\t\ttabIndex: -1\n\t\t\t} );\n\t\tthis._addClass( this.anchors, \"ui-tabs-anchor\" );\n\n\t\tthis.panels = $();\n\n\t\tthis.anchors.each( function( i, anchor ) {\n\t\t\tvar selector, panel, panelId,\n\t\t\t\tanchorId = $( anchor ).uniqueId().attr( \"id\" ),\n\t\t\t\ttab = $( anchor ).closest( \"li\" ),\n\t\t\t\toriginalAriaControls = tab.attr( \"aria-controls\" );\n\n\t\t\t// Inline tab\n\t\t\tif ( that._isLocal( anchor ) ) {\n\t\t\t\tselector = anchor.hash;\n\t\t\t\tpanelId = selector.substring( 1 );\n\t\t\t\tpanel = that.element.find( that._sanitizeSelector( selector ) );\n\n\t\t\t// remote tab\n\t\t\t} else {\n\n\t\t\t\t// If the tab doesn't already have aria-controls,\n\t\t\t\t// generate an id by using a throw-away element\n\t\t\t\tpanelId = tab.attr( \"aria-controls\" ) || $( {} ).uniqueId()[ 0 ].id;\n\t\t\t\tselector = \"#\" + panelId;\n\t\t\t\tpanel = that.element.find( selector );\n\t\t\t\tif ( !panel.length ) {\n\t\t\t\t\tpanel = that._createPanel( panelId );\n\t\t\t\t\tpanel.insertAfter( that.panels[ i - 1 ] || that.tablist );\n\t\t\t\t}\n\t\t\t\tpanel.attr( \"aria-live\", \"polite\" );\n\t\t\t}\n\n\t\t\tif ( panel.length ) {\n\t\t\t\tthat.panels = that.panels.add( panel );\n\t\t\t}\n\t\t\tif ( originalAriaControls ) {\n\t\t\t\ttab.data( \"ui-tabs-aria-controls\", originalAriaControls );\n\t\t\t}\n\t\t\ttab.attr( {\n\t\t\t\t\"aria-controls\": panelId,\n\t\t\t\t\"aria-labelledby\": anchorId\n\t\t\t} );\n\t\t\tpanel.attr( \"aria-labelledby\", anchorId );\n\t\t} );\n\n\t\tthis.panels.attr( \"role\", \"tabpanel\" );\n\t\tthis._addClass( this.panels, \"ui-tabs-panel\", \"ui-widget-content\" );\n\n\t\t// Avoid memory leaks (#10056)\n\t\tif ( prevTabs ) {\n\t\t\tthis._off( prevTabs.not( this.tabs ) );\n\t\t\tthis._off( prevAnchors.not( this.anchors ) );\n\t\t\tthis._off( prevPanels.not( this.panels ) );\n\t\t}\n\t},\n\n\t// Allow overriding how to find the list for rare usage scenarios (#7715)\n\t_getList: function() {\n\t\treturn this.tablist || this.element.find( \"ol, ul\" ).eq( 0 );\n\t},\n\n\t_createPanel: function( id ) {\n\t\treturn $( \"<div>\" )\n\t\t\t.attr( \"id\", id )\n\t\t\t.data( \"ui-tabs-destroy\", true );\n\t},\n\n\t_setOptionDisabled: function( disabled ) {\n\t\tvar currentItem, li, i;\n\n\t\tif ( Array.isArray( disabled ) ) {\n\t\t\tif ( !disabled.length ) {\n\t\t\t\tdisabled = false;\n\t\t\t} else if ( disabled.length === this.anchors.length ) {\n\t\t\t\tdisabled = true;\n\t\t\t}\n\t\t}\n\n\t\t// Disable tabs\n\t\tfor ( i = 0; ( li = this.tabs[ i ] ); i++ ) {\n\t\t\tcurrentItem = $( li );\n\t\t\tif ( disabled === true || $.inArray( i, disabled ) !== -1 ) {\n\t\t\t\tcurrentItem.attr( \"aria-disabled\", \"true\" );\n\t\t\t\tthis._addClass( currentItem, null, \"ui-state-disabled\" );\n\t\t\t} else {\n\t\t\t\tcurrentItem.removeAttr( \"aria-disabled\" );\n\t\t\t\tthis._removeClass( currentItem, null, \"ui-state-disabled\" );\n\t\t\t}\n\t\t}\n\n\t\tthis.options.disabled = disabled;\n\n\t\tthis._toggleClass( this.widget(), this.widgetFullName + \"-disabled\", null,\n\t\t\tdisabled === true );\n\t},\n\n\t_setupEvents: function( event ) {\n\t\tvar events = {};\n\t\tif ( event ) {\n\t\t\t$.each( event.split( \" \" ), function( index, eventName ) {\n\t\t\t\tevents[ eventName ] = \"_eventHandler\";\n\t\t\t} );\n\t\t}\n\n\t\tthis._off( this.anchors.add( this.tabs ).add( this.panels ) );\n\n\t\t// Always prevent the default action, even when disabled\n\t\tthis._on( true, this.anchors, {\n\t\t\tclick: function( event ) {\n\t\t\t\tevent.preventDefault();\n\t\t\t}\n\t\t} );\n\t\tthis._on( this.anchors, events );\n\t\tthis._on( this.tabs, { keydown: \"_tabKeydown\" } );\n\t\tthis._on( this.panels, { keydown: \"_panelKeydown\" } );\n\n\t\tthis._focusable( this.tabs );\n\t\tthis._hoverable( this.tabs );\n\t},\n\n\t_setupHeightStyle: function( heightStyle ) {\n\t\tvar maxHeight,\n\t\t\tparent = this.element.parent();\n\n\t\tif ( heightStyle === \"fill\" ) {\n\t\t\tmaxHeight = parent.height();\n\t\t\tmaxHeight -= this.element.outerHeight() - this.element.height();\n\n\t\t\tthis.element.siblings( \":visible\" ).each( function() {\n\t\t\t\tvar elem = $( this ),\n\t\t\t\t\tposition = elem.css( \"position\" );\n\n\t\t\t\tif ( position === \"absolute\" || position === \"fixed\" ) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\tmaxHeight -= elem.outerHeight( true );\n\t\t\t} );\n\n\t\t\tthis.element.children().not( this.panels ).each( function() {\n\t\t\t\tmaxHeight -= $( this ).outerHeight( true );\n\t\t\t} );\n\n\t\t\tthis.panels.each( function() {\n\t\t\t\t$( this ).height( Math.max( 0, maxHeight -\n\t\t\t\t\t$( this ).innerHeight() + $( this ).height() ) );\n\t\t\t} )\n\t\t\t\t.css( \"overflow\", \"auto\" );\n\t\t} else if ( heightStyle === \"auto\" ) {\n\t\t\tmaxHeight = 0;\n\t\t\tthis.panels.each( function() {\n\t\t\t\tmaxHeight = Math.max( maxHeight, $( this ).height( \"\" ).height() );\n\t\t\t} ).height( maxHeight );\n\t\t}\n\t},\n\n\t_eventHandler: function( event ) {\n\t\tvar options = this.options,\n\t\t\tactive = this.active,\n\t\t\tanchor = $( event.currentTarget ),\n\t\t\ttab = anchor.closest( \"li\" ),\n\t\t\tclickedIsActive = tab[ 0 ] === active[ 0 ],\n\t\t\tcollapsing = clickedIsActive && options.collapsible,\n\t\t\ttoShow = collapsing ? $() : this._getPanelForTab( tab ),\n\t\t\ttoHide = !active.length ? $() : this._getPanelForTab( active ),\n\t\t\teventData = {\n\t\t\t\toldTab: active,\n\t\t\t\toldPanel: toHide,\n\t\t\t\tnewTab: collapsing ? $() : tab,\n\t\t\t\tnewPanel: toShow\n\t\t\t};\n\n\t\tevent.preventDefault();\n\n\t\tif ( tab.hasClass( \"ui-state-disabled\" ) ||\n\n\t\t\t\t// tab is already loading\n\t\t\t\ttab.hasClass( \"ui-tabs-loading\" ) ||\n\n\t\t\t\t// can't switch durning an animation\n\t\t\t\tthis.running ||\n\n\t\t\t\t// click on active header, but not collapsible\n\t\t\t\t( clickedIsActive && !options.collapsible ) ||\n\n\t\t\t\t// allow canceling activation\n\t\t\t\t( this._trigger( \"beforeActivate\", event, eventData ) === false ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\toptions.active = collapsing ? false : this.tabs.index( tab );\n\n\t\tthis.active = clickedIsActive ? $() : tab;\n\t\tif ( this.xhr ) {\n\t\t\tthis.xhr.abort();\n\t\t}\n\n\t\tif ( !toHide.length && !toShow.length ) {\n\t\t\t$.error( \"jQuery UI Tabs: Mismatching fragment identifier.\" );\n\t\t}\n\n\t\tif ( toShow.length ) {\n\t\t\tthis.load( this.tabs.index( tab ), event );\n\t\t}\n\t\tthis._toggle( event, eventData );\n\t},\n\n\t// Handles show/hide for selecting tabs\n\t_toggle: function( event, eventData ) {\n\t\tvar that = this,\n\t\t\ttoShow = eventData.newPanel,\n\t\t\ttoHide = eventData.oldPanel;\n\n\t\tthis.running = true;\n\n\t\tfunction complete() {\n\t\t\tthat.running = false;\n\t\t\tthat._trigger( \"activate\", event, eventData );\n\t\t}\n\n\t\tfunction show() {\n\t\t\tthat._addClass( eventData.newTab.closest( \"li\" ), \"ui-tabs-active\", \"ui-state-active\" );\n\n\t\t\tif ( toShow.length && that.options.show ) {\n\t\t\t\tthat._show( toShow, that.options.show, complete );\n\t\t\t} else {\n\t\t\t\ttoShow.show();\n\t\t\t\tcomplete();\n\t\t\t}\n\t\t}\n\n\t\t// Start out by hiding, then showing, then completing\n\t\tif ( toHide.length && this.options.hide ) {\n\t\t\tthis._hide( toHide, this.options.hide, function() {\n\t\t\t\tthat._removeClass( eventData.oldTab.closest( \"li\" ),\n\t\t\t\t\t\"ui-tabs-active\", \"ui-state-active\" );\n\t\t\t\tshow();\n\t\t\t} );\n\t\t} else {\n\t\t\tthis._removeClass( eventData.oldTab.closest( \"li\" ),\n\t\t\t\t\"ui-tabs-active\", \"ui-state-active\" );\n\t\t\ttoHide.hide();\n\t\t\tshow();\n\t\t}\n\n\t\ttoHide.attr( \"aria-hidden\", \"true\" );\n\t\teventData.oldTab.attr( {\n\t\t\t\"aria-selected\": \"false\",\n\t\t\t\"aria-expanded\": \"false\"\n\t\t} );\n\n\t\t// If we're switching tabs, remove the old tab from the tab order.\n\t\t// If we're opening from collapsed state, remove the previous tab from the tab order.\n\t\t// If we're collapsing, then keep the collapsing tab in the tab order.\n\t\tif ( toShow.length && toHide.length ) {\n\t\t\teventData.oldTab.attr( \"tabIndex\", -1 );\n\t\t} else if ( toShow.length ) {\n\t\t\tthis.tabs.filter( function() {\n\t\t\t\treturn $( this ).attr( \"tabIndex\" ) === 0;\n\t\t\t} )\n\t\t\t\t.attr( \"tabIndex\", -1 );\n\t\t}\n\n\t\ttoShow.attr( \"aria-hidden\", \"false\" );\n\t\teventData.newTab.attr( {\n\t\t\t\"aria-selected\": \"true\",\n\t\t\t\"aria-expanded\": \"true\",\n\t\t\ttabIndex: 0\n\t\t} );\n\t},\n\n\t_activate: function( index ) {\n\t\tvar anchor,\n\t\t\tactive = this._findActive( index );\n\n\t\t// Trying to activate the already active panel\n\t\tif ( active[ 0 ] === this.active[ 0 ] ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// Trying to collapse, simulate a click on the current active header\n\t\tif ( !active.length ) {\n\t\t\tactive = this.active;\n\t\t}\n\n\t\tanchor = active.find( \".ui-tabs-anchor\" )[ 0 ];\n\t\tthis._eventHandler( {\n\t\t\ttarget: anchor,\n\t\t\tcurrentTarget: anchor,\n\t\t\tpreventDefault: $.noop\n\t\t} );\n\t},\n\n\t_findActive: function( index ) {\n\t\treturn index === false ? $() : this.tabs.eq( index );\n\t},\n\n\t_getIndex: function( index ) {\n\n\t\t// meta-function to give users option to provide a href string instead of a numerical index.\n\t\tif ( typeof index === \"string\" ) {\n\t\t\tindex = this.anchors.index( this.anchors.filter( \"[href$='\" +\n\t\t\t\t$.escapeSelector( index ) + \"']\" ) );\n\t\t}\n\n\t\treturn index;\n\t},\n\n\t_destroy: function() {\n\t\tif ( this.xhr ) {\n\t\t\tthis.xhr.abort();\n\t\t}\n\n\t\tthis.tablist\n\t\t\t.removeAttr( \"role\" )\n\t\t\t.off( this.eventNamespace );\n\n\t\tthis.anchors\n\t\t\t.removeAttr( \"role tabIndex\" )\n\t\t\t.removeUniqueId();\n\n\t\tthis.tabs.add( this.panels ).each( function() {\n\t\t\tif ( $.data( this, \"ui-tabs-destroy\" ) ) {\n\t\t\t\t$( this ).remove();\n\t\t\t} else {\n\t\t\t\t$( this ).removeAttr( \"role tabIndex \" +\n\t\t\t\t\t\"aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded\" );\n\t\t\t}\n\t\t} );\n\n\t\tthis.tabs.each( function() {\n\t\t\tvar li = $( this ),\n\t\t\t\tprev = li.data( \"ui-tabs-aria-controls\" );\n\t\t\tif ( prev ) {\n\t\t\t\tli\n\t\t\t\t\t.attr( \"aria-controls\", prev )\n\t\t\t\t\t.removeData( \"ui-tabs-aria-controls\" );\n\t\t\t} else {\n\t\t\t\tli.removeAttr( \"aria-controls\" );\n\t\t\t}\n\t\t} );\n\n\t\tthis.panels.show();\n\n\t\tif ( this.options.heightStyle !== \"content\" ) {\n\t\t\tthis.panels.css( \"height\", \"\" );\n\t\t}\n\t},\n\n\tenable: function( index ) {\n\t\tvar disabled = this.options.disabled;\n\t\tif ( disabled === false ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( index === undefined ) {\n\t\t\tdisabled = false;\n\t\t} else {\n\t\t\tindex = this._getIndex( index );\n\t\t\tif ( Array.isArray( disabled ) ) {\n\t\t\t\tdisabled = $.map( disabled, function( num ) {\n\t\t\t\t\treturn num !== index ? num : null;\n\t\t\t\t} );\n\t\t\t} else {\n\t\t\t\tdisabled = $.map( this.tabs, function( li, num ) {\n\t\t\t\t\treturn num !== index ? num : null;\n\t\t\t\t} );\n\t\t\t}\n\t\t}\n\t\tthis._setOptionDisabled( disabled );\n\t},\n\n\tdisable: function( index ) {\n\t\tvar disabled = this.options.disabled;\n\t\tif ( disabled === true ) {\n\t\t\treturn;\n\t\t}\n\n\t\tif ( index === undefined ) {\n\t\t\tdisabled = true;\n\t\t} else {\n\t\t\tindex = this._getIndex( index );\n\t\t\tif ( $.inArray( index, disabled ) !== -1 ) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tif ( Array.isArray( disabled ) ) {\n\t\t\t\tdisabled = $.merge( [ index ], disabled ).sort();\n\t\t\t} else {\n\t\t\t\tdisabled = [ index ];\n\t\t\t}\n\t\t}\n\t\tthis._setOptionDisabled( disabled );\n\t},\n\n\tload: function( index, event ) {\n\t\tindex = this._getIndex( index );\n\t\tvar that = this,\n\t\t\ttab = this.tabs.eq( index ),\n\t\t\tanchor = tab.find( \".ui-tabs-anchor\" ),\n\t\t\tpanel = this._getPanelForTab( tab ),\n\t\t\teventData = {\n\t\t\t\ttab: tab,\n\t\t\t\tpanel: panel\n\t\t\t},\n\t\t\tcomplete = function( jqXHR, status ) {\n\t\t\t\tif ( status === \"abort\" ) {\n\t\t\t\t\tthat.panels.stop( false, true );\n\t\t\t\t}\n\n\t\t\t\tthat._removeClass( tab, \"ui-tabs-loading\" );\n\t\t\t\tpanel.removeAttr( \"aria-busy\" );\n\n\t\t\t\tif ( jqXHR === that.xhr ) {\n\t\t\t\t\tdelete that.xhr;\n\t\t\t\t}\n\t\t\t};\n\n\t\t// Not remote\n\t\tif ( this._isLocal( anchor[ 0 ] ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\tthis.xhr = $.ajax( this._ajaxSettings( anchor, event, eventData ) );\n\n\t\t// Support: jQuery <1.8\n\t\t// jQuery <1.8 returns false if the request is canceled in beforeSend,\n\t\t// but as of 1.8, $.ajax() always returns a jqXHR object.\n\t\tif ( this.xhr && this.xhr.statusText !== \"canceled\" ) {\n\t\t\tthis._addClass( tab, \"ui-tabs-loading\" );\n\t\t\tpanel.attr( \"aria-busy\", \"true\" );\n\n\t\t\tthis.xhr\n\t\t\t\t.done( function( response, status, jqXHR ) {\n\n\t\t\t\t\t// support: jQuery <1.8\n\t\t\t\t\t// http://bugs.jquery.com/ticket/11778\n\t\t\t\t\tsetTimeout( function() {\n\t\t\t\t\t\tpanel.html( response );\n\t\t\t\t\t\tthat._trigger( \"load\", event, eventData );\n\n\t\t\t\t\t\tcomplete( jqXHR, status );\n\t\t\t\t\t}, 1 );\n\t\t\t\t} )\n\t\t\t\t.fail( function( jqXHR, status ) {\n\n\t\t\t\t\t// support: jQuery <1.8\n\t\t\t\t\t// http://bugs.jquery.com/ticket/11778\n\t\t\t\t\tsetTimeout( function() {\n\t\t\t\t\t\tcomplete( jqXHR, status );\n\t\t\t\t\t}, 1 );\n\t\t\t\t} );\n\t\t}\n\t},\n\n\t_ajaxSettings: function( anchor, event, eventData ) {\n\t\tvar that = this;\n\t\treturn {\n\n\t\t\t// Support: IE <11 only\n\t\t\t// Strip any hash that exists to prevent errors with the Ajax request\n\t\t\turl: anchor.attr( \"href\" ).replace( /#.*$/, \"\" ),\n\t\t\tbeforeSend: function( jqXHR, settings ) {\n\t\t\t\treturn that._trigger( \"beforeLoad\", event,\n\t\t\t\t\t$.extend( { jqXHR: jqXHR, ajaxSettings: settings }, eventData ) );\n\t\t\t}\n\t\t};\n\t},\n\n\t_getPanelForTab: function( tab ) {\n\t\tvar id = $( tab ).attr( \"aria-controls\" );\n\t\treturn this.element.find( this._sanitizeSelector( \"#\" + id ) );\n\t}\n} );\n\n// DEPRECATED\n// TODO: Switch return back to widget declaration at top of file when this is removed\nif ( $.uiBackCompat !== false ) {\n\n\t// Backcompat for ui-tab class (now ui-tabs-tab)\n\t$.widget( \"ui.tabs\", $.ui.tabs, {\n\t\t_processTabs: function() {\n\t\t\tthis._superApply( arguments );\n\t\t\tthis._addClass( this.tabs, \"ui-tab\" );\n\t\t}\n\t} );\n}\n\nreturn $.ui.tabs;\n\n} );\n"}
}});