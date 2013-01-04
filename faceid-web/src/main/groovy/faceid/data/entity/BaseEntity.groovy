package faceid.data.entity

import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@MappedSuperclass
class BaseEntity {

    @Id
    @GeneratedValue
    Long uid

    boolean equals(o) {
        if (this.is(o)) return true
        if (getClass() != o.class) return false

        BaseEntity that = (BaseEntity) o

        if (uid != that.uid) return false

        return true
    }

    int hashCode() {
        return (uid != null ? uid.hashCode() : 0)
    }
}
