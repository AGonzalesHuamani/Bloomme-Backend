import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';


interface RewardAttributes {
    reward_id: number;
    image: string;
    imageHash:string;
    required_points: number;
    state?: 'unlocked' | 'locked'; 
    type: 'background' | 'avatar';
}

interface RewardCreationAttributes extends Optional<RewardAttributes, 'reward_id'| 'state'> {}

class Reward extends Model<RewardAttributes, RewardCreationAttributes> implements RewardAttributes {
    public reward_id!: number; 
    public image!: string; 
    public imageHash!: string;
    public required_points!: number;
    public state?: 'unlocked' | 'locked'; 
    public type!: 'background' | 'avatar'; 

    public readonly createdAt!: Date; 
    public readonly updatedAt!: Date; 
}

Reward.init(
    {
        reward_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        imageHash:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        required_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state: {
            type: DataTypes.ENUM('unlocked', 'locked'),
            allowNull: false,
            defaultValue: 'locked',
        },
        type: {
            type: DataTypes.ENUM('background', 'avatar'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Reward",
        tableName: "reward",
        timestamps: true, 
    }
);

export {Reward};