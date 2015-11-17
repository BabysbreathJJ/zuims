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
 * @version $Id: User_type-vip_level.java, v 0.1 
 *
 *CREATE TABLE IF NOT EXISTS `mydb`.`user_type-vip_level` (
 * `days` INT NOT NULL,
 * `utid` INT NOT NULL,
 * `vlid` INT NOT NULL,
 * PRIMARY KEY (`utid`, `vlid`),
 * INDEX `vlid_idx` (`vlid` ASC),
 * CONSTRAINT `utid`
 *   FOREIGN KEY (`utid`)
 *   REFERENCES `mydb`.`user_type` (`utid`)
 *   ON DELETE NO ACTION
 *   ON UPDATE NO ACTION,
 * CONSTRAINT `vlid`
 *   FOREIGN KEY (`vlid`)
 *   REFERENCES `mydb`.`vip_level` (`vlid`)
 *   ON DELETE NO ACTION
 *   ON UPDATE NO ACTION)
 * ENGINE = InnoDB;
 *
 *
 */
@Entity
@Table(name = "user_type-vip_level")
public class User_type2vip_level {
    @Id
    @NotNull
    @Column(name = "vlid")
    private int vlid;

    @Id
    @NotNull
    @Column(name = "utid")
    private int utid;

    @Column(name = "days")
    @NotNull
    private int days;

    public int getVlid() {
        return vlid;
    }

    public void setVlid(int value) {
        this.vlid = value;
    }

    public int getUtid() {
        return utid;
    }

    public void setUtid(int value) {
        this.utid = value;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int value) {
        this.days = value;
    }
}