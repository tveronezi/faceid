package faceid.data.entity

import javax.persistence.*

@Entity
@Table(name = 'auth_log_tbl')
class AuthenticationLog extends BaseEntity {

    @Column(name = 'usr_account', nullable = false)
    String account

    @Column(name = 'log_time', nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    Date date

    @Column(name = 'log_type', nullable = false)
    @Enumerated(EnumType.STRING)
    AuthenticationLogType logType
}
