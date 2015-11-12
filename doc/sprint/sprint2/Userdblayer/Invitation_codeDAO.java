package ms.zui.datamodel.dao;

import java.sql.Timestamp;
import java.util.List;

import javax.transaction.Transactional;

import ms.zui.datamodel.domain.Invitation_code;

import org.springframework.data.repository.CrudRepository;

public interface Invitation_codeDAO extends CrudRepository<Invitation_code,String>{
	public Invitation_code findByCode(String code);
    public List<Invitation_code> findByUtid(int utid);
    public List<Invitation_code> findByExpired_date(Timestamp expired_date);
    public List<Invitation_code> findByAvailable(boolean available);
    public boolean exists(String code);
    public boolean exists(int utid);
    @SuppressWarnings("unchecked")
	public Invitation_code save(Invitation_code ic);
    public void delete(Invitation_code ic);
    public Long countByavailable(boolean available);
    public void deleteAll();
}
