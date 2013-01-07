package faceid.data.execution.command;

import faceid.data.entity.AuthenticationLog;
import faceid.data.execution.BaseEAO;
import faceid.data.execution.DbCommand;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

public class FindAllAuthenticationLog implements DbCommand<List<AuthenticationLog>> {

    @Override
    public List<AuthenticationLog> execute(BaseEAO eao) {
        final CriteriaBuilder cb = eao.getCriteriaBuilder();
        final CriteriaQuery<AuthenticationLog> cq = cb.createQuery(AuthenticationLog.class);
        final Root<AuthenticationLog> root = cq.from(AuthenticationLog.class);
        cq.select(root);
        final TypedQuery<AuthenticationLog> q = eao.createQuery(cq);
        cq.orderBy(cb.desc(root.get("date")));
        return q.getResultList();
    }
}
