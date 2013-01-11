Ext.define('faceid.view.PortletContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.faceid-portlet-container',
    layout: 'absolute',
    autoScroll: true,
    bodyBorder: false,
    body: false,
    items: [],
    showPortlet: function (panelType, settings) {
        var panelArr = this.query(panelType);
        if (Ext.isEmpty(panelArr)) {
            var portlet = Ext.create('widget.' + panelType, {
                x: settings.get('x'),
                y: settings.get('y'),
                height: settings.get('height'),
                width: settings.get('width')
            });
            this.add(portlet);
            portlet.show();
        } else {
            panelArr[0].show();
        }
    },
    initComponent: function () {
        console.log('initComponent', 'PortletContainer');
        this.callParent(arguments);
    }
});