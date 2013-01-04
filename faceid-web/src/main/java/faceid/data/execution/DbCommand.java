package faceid.data.execution;

public interface DbCommand<T> {

    T execute(BaseEAO eao);
}
