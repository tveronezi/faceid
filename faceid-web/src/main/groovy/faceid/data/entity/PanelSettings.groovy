package faceid.data.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table
import javax.persistence.UniqueConstraint

@Entity
@Table(name = 'user_tbl', uniqueConstraints = @UniqueConstraint(columnNames = ['panel_type']))
class PanelSettings extends BaseEntity {

    @Column(name = 'panel_type')
    String panelType

    @Column(name = 'panel_x')
    Integer x

    @Column(name = 'panel_y')
    Integer y

    @Column(name = 'panel_width')
    Integer width

    @Column(name = 'panel_height')
    Integer height

}
