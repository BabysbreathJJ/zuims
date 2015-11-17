package ms.zui.datamodel.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * User实体类
 * 
 * @author Xin
 * @version $Id: Vip_level.java, v 0.1 
 *
 *CREATE TABLE IF NOT EXISTS `mydb`.`user-user_type` (
 * `phoneid` INT NOT NULL,
 * `utid` INT NOT NULL,
 * PRIMARY KEY (`phoneid`, `utid`),
 * INDEX `utid_idx` (`utid` ASC),
 * CONSTRAINT `phoneid`
 *   FOREIGN KEY (`phoneid`)
 *   REFERENCES `mydb`.`user` (`phoneid`)
 *   ON DELETE NO ACTION
 *   ON UPDATE NO ACTION,
 * CONSTRAINT `utid`
 *   FOREIGN KEY (`utid`)
 *   REFERENCES `mydb`.`user_type` (`utid`)
 *   ON DELETE NO ACTION
 *   ON UPDATE NO ACTION)
 * ENGINE = InnoDB;
 *
 *
 */
@Entity
@Table(name = "user-user_type")
public class User2user_type {
	
	@Id
    @NotNull
    @Column(name = "utid")
    private int utid;
	
	@Id
    @NotNull
    @Column(name = "phoneid")
    private int phoneid;
	
	public int getUtid() {
		return utid;
	}
    public void setUtid(int value) {
        this.utid = value;
    }

    public int getPhoneid() {
        return phoneid;
    }

    public void setPhoneid(int value) {
        this.phoneid = value;
    }
    
}