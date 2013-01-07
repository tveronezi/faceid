package faceid.data.dto

import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlElement
import javax.xml.bind.annotation.XmlRootElement

@XmlAccessorType(XmlAccessType.NONE)
@XmlRootElement
class UserDto implements Serializable {

    @XmlElement
    Long id

    @XmlElement
    String name

    @XmlElement
    String account
}
