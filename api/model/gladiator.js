import db from "../core/mysql.js";
import CustomError from "../core/error.js";

export default class Gladiator {
  constructor({
    id,
    master,
    name,
    vstr,
    vagi,
    vint,
    lvl,
    xp,
    skin,
    code,
    blocks,
    mmr,
    version,
  }) {
    this.id = id;
    this.master = master;
    this.name = name;
    this.vstr = vstr;
    this.vagi = vagi;
    this.vint = vint;
    this.lvl = lvl;
    this.xp = xp;
    this.skin = skin;
    this.code = code;
    this.blocks = blocks;
    this.mmr = mmr;
    this.version = version;
  }

  async getByName(name) {
    if (!name) throw new CustomError(400, "Name is required");
    try {
      const gladiators = await db.find("gladiators", {
        filter: { name },
      });

      return gladiators;
    } catch (error) {
      throw new CustomError(
        error.code ?? 500,
        error.message ?? "internal server error"
      );
    }
  }

  async getByCod(cod) {
    if (!cod) throw new CustomError(400, "Cod is required");
    try {

      const gladiators = await db.find("gladiators", {
        filter: { cod },
      });
      
      return gladiators;
    } catch (error) {
      throw new CustomError(
        error.code ?? 500,
        error.message ?? "internal server error"
      );
    }
  }

  async getByMaster(master) {
    if (!master) throw new CustomError(400, "Master id is required");

    try {
      const gladiators = await db.find("gladiators", {
        filter: { master: master },
      });

      return gladiators;
    } catch (error) {
      throw new CustomError(
        error.code ?? 500,
        error.message ?? "internal server error"
      );
    }
  }

  // checar se o usuário possui mais de 6 gladiadores para impedir de criar um novo gladiador
  async checkGladiatorsNumberByMaster(master) {
    try {
      const gladiators = await db.find("gladiators", {
        filter: { master },
      });

      return { count: gladiators.length };
    } catch (error) {
      throw new CustomError(
        error.code ?? 500,
        error.message ?? "internal server error"
      );
    }
  }
}
      return this;
  }
}

export default Gladiator;
