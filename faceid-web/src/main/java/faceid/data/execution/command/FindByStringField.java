package faceid.data.execution.command;

import faceid.data.execution.BaseEAO;
import faceid.data.execution.DbCommand;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;

public class FindByStringField<T> implements DbCommand<T> {

    public final Class<T> cls;
    public final String name;
    public String value;

    public FindByStringField(Class<T> cls, String name) {
        this.cls = cls;
        this.name = name;
    }

    @Override
    public T execute(BaseEAO eao) {
        final CriteriaBuilder cb = eao.getCriteriaBuilder();
        final CriteriaQuery<T> cq = cb.createQuery(this.cls);
        final Root<T> root = cq.from(this.cls);
        cq.select(root);
        final Path<String> pathName = root.get(this.name);
        final Predicate pValue = cb.equal(pathName, this.value);
        cq.where(pValue);
        final TypedQuery<T> q = eao.createQuery(cq);

        try {
            return q.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
