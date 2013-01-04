package faceid.data.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table
import javax.persistence.UniqueConstraint

@Entity
@Table(name = 'user_tbl', uniqueConstraints = @UniqueConstraint(columnNames = ['usr_name']))
class User extends BaseEntity {

    @Column(name = 'usr_name', nullable = false)
    String name

    @Column(name = 'usr_account', nullable = false)
    String account

    //TODO: encrypt me
    @Column(name = 'usr_pass', nullable = false)
    String password

}
