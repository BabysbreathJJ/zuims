package ms.zui.datamodel.dao;

import java.util.List;

import javax.transaction.Transactional;

import ms.zui.datamodel.domain.User;

import org.springframework.data.repository.CrudRepository;

/**
 * 用户模型DAO
 * 
 * @author Xin
 * @version $Id: UserDAO.java, v 0.1 
 */
@Transactional
public interface UserDAO extends CrudRepository<User,Integer> {
    public User findByEmail(String email);
    public User findByPhoneid(int phoneid);
    public List<User> findByLast_name(String last_name);
    public boolean exists(int phoneid);
    @SuppressWarnings("unchecked")
	public User save(User us);
    public void delete(User us);
    public Long countByLast_name(String last_name);
    public void deleteAll();
}
