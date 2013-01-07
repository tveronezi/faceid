package faceid.service.bean;


import faceid.data.entity.PanelSettings;
import faceid.data.entity.User;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.command.CreateUser;
import faceid.data.execution.command.FindByStringField;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class SettingsImpl {
    @EJB
    private BaseEAO baseEAO;

    public PanelSettings createPanelSettings(String panelType, Integer x, Integer y, Integer height, Integer width) {
        PanelSettings settings = new PanelSettings();
        settings.setPanelType(panelType);
        settings.setX(x);
        settings.setY(y);
        settings.setHeight(height);
        settings.setWidth(width);
        return this.baseEAO.create(settings);
    }

    public List<PanelSettings> listAllPanelSettings() {
        return this.baseEAO.findAll(PanelSettings.class);
    }
}
