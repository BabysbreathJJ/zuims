package ms.zui.datamodel.domain;

import java.sql.Timestamp;

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
 * @version $Id: Invitation_code.java, v 0.1 
 *
 *CREATE TABLE IF NOT EXISTS `mydb`.`invitation_code` (
 * `code` VARCHAR(12) NOT NULL,
 * `available` TINYINT(1) NOT NULL,
 * `expired_date` DATETIME NOT NULL,
 * `utid` INT NOT NULL,
 * PRIMARY KEY (`code`),
 * INDEX `utid_idx` (`utid` ASC),
 * CONSTRAINT `utid`
 *   FOREIGN KEY (`utid`)
 *   REFERENCES `mydb`.`user_type` (`utid`)
 *   ON DELETE NO ACTION
 *   ON UPDATE NO ACTION)
 *    ENGINE = InnoDB;
 *
 *
 */
@Entity
@Table(name = "invitation_code")
public class Invitation_code {
    @Id
    @NotNull
    @Column(name = "code")
    private String code;

    @Column(name = "available")
    @NotNull
    private Boolean available;

    @Column(name = "expired_date")
    @NotNull
    private Timestamp expired_date;

    @Column(name = "utid")
    @NotNull
    private int utid;

    public String getCode() {
        return code;
    }

    public void setCode(String value) {
        this.code = value;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean value) {
        this.available = value;
    }

    public Timestamp getExpired_date() {
        return expired_date;
    }

    public int getUtid() {
        return utid;
    }

    public void setUtid(int value) {
        this.utid = value;
    }
}