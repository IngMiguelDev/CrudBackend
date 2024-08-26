"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.postProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const sequelize_1 = require("sequelize");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield product_1.default.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findByPk(id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({
            msg: `No existe un producto con este id: ${id}`
        });
    }
});
exports.getProduct = getProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findByPk(id);
    if (!product) {
        res.status(404).json({
            msg: `No existe un producto con este id: ${id}`
        });
    }
    else {
        yield product.destroy();
        res.json({
            msg: 'Producto eliminado exitosamente'
        });
    }
});
exports.deleteProduct = deleteProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield product_1.default.create(body);
        res.status(201).json({
            msg: 'El producto fue agregado correctamente',
        });
    }
    catch (error) {
        if (error instanceof sequelize_1.ValidationError) {
            const messages = error.errors.map(err => err.message);
            res.status(400).json({
                msg: 'Error de validación',
                errors: messages,
            });
        }
        else {
            console.error(error);
            res.status(500).json({
                msg: 'Ups, surgió un error, comunícate con soporte',
            });
        }
    }
});
exports.postProduct = postProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const product = yield product_1.default.findByPk(id);
        if (product) {
            yield product.update(body);
            res.json({
                msg: 'Producto actualizado correctamente',
                product
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un producto con el id: ${id}`,
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ups, surgió un error, comunícate con soporte',
        });
    }
});
exports.updateProduct = updateProduct;
