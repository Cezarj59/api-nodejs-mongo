const mongoose = require('../database')
const bcrypt = require('bcryptjs')

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  telefone: [
    {
      _id: false,
      numero: {
        type: String,
        required: true
      },
      ddd: {
        type: String,
        required: true
      }
    }
  ],
  data_criacao: {
    type: Date,
    default: Date.now,
    required: true
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
    required: true
  },
  ultimo_login: {
    type: Date,
    default: null
  }
})

// Pré-processamento antes de salvar o documento do usuário
userSchema.pre('save', async function (next) {
  // 'this' se refere ao documento do usuário que está sendo salvo

  // Verifica se a senha foi modificada durante esta operação de salvamento
  if (this.isModified('senha')) {
    // Se a senha foi modificada, gera um hash usando bcrypt
    const hashedPassword = await bcrypt.hash(this.senha || '', 10)
    // Atualiza a senha no documento com o hash gerado
    this.senha = hashedPassword

    // Atualiza data_atualizacao quando a senha é modificada
    this.data_atualizacao = new Date()
  }

  // Atualiza data_atualizacao apenas se alguns campos específicos forem modificados
  if (this.isModified('nome') || this.isModified('email') || this.isModified('telefone')) {
    this.data_atualizacao = new Date()
  }
  // Chama 'next()' para continuar com o processo de salvamento
  next()
})

// Middleware para atualizar a data de último login no momento do login
userSchema.methods.atualizarUltimoLogin = async function () {
  this.ultimo_login = new Date()
  await this.save()
}

// Método para atualizar a data de atualização
userSchema.methods.atualizarDataAtualizacao = async function () {
  this.data_atualizacao = new Date()
  await this.save()
}

// Pós-processamento após encontrar documentos
userSchema.post('find', function (result, next) {
  if (Array.isArray(result)) {
    result.forEach((doc) => {
      if (doc.senha) {
        // doc.senha = undefined;
      }
    })
  } else if (result && result.senha) {
    result.senha = undefined
  }
  next()
})

// Criar um modelo (classe) usando o esquema
const User = mongoose.model('User', userSchema)

// Exportando
module.exports = User
