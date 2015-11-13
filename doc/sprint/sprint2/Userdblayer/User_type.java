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
 * @version $Id: User_type.java, v 0.1 
 *CREATE TABLE IF NOT EXISTS `mydb`.`user_type` (
 * `utid` INT NOT NULL,
 * `ut_name` VARCHAR(45) NOT NULL,
 * PRIMARY KEY (`utid`))
 *ENGINE = InnoDB;
 */
@Entity
@Table(name = "user_type")
public class User_type {
    @Id
    @NotNull
    @Column(name = "utid")
    private int utid;

    @Column(name = "ut_name")
    @NotNull
    private String ut_name;

    public User_type() {
    }

    public int getUtid() {
        return utid;
    }

    public void setUtid(int value) {
        this.utid = value;
    }

    public String getUt_name() {
        return ut_name;
    }
    
    public void setUt_name(String value) {
        this.ut_name = value;
    }
}
