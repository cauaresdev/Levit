package com.example.levit.auth

import android.content.Intent
import android.os.Bundle
import android.text.TextWatcher
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.example.levit.R
import com.example.levit.databinding.ActivityCadastroBinding
import android.text.Editable

class CadastroActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCadastroBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCadastroBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.etConfirmarSenha.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                validarSenhasIguais()
            }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        // Atualize o TextWatcher da PRIMEIRA senha para checar a igualdade também
        binding.etSenha.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                verificarForcaSenha(s.toString()) // A função das barrinhas que você já fez

                // Só verifica a igualdade se o campo de confirmação já tiver algo digitado
                if (binding.etConfirmarSenha.text.toString().isNotEmpty()) {
                    validarSenhasIguais()
                }
            }
            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
        })

        // Ação de clique no texto da seta
        binding.textVoltar.setOnClickListener {
            finish() // Fecha a tela atual e volta para a anterior
        }

        // Tela de cadastro ainda não integrada a um back-end, mexer dps
        binding.btnCriarConta.setOnClickListener {
            Toast.makeText(this, "Cadastro efetuado", Toast.LENGTH_SHORT).show()
        }

        binding.tvFacaLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }

        binding.btnCriarConta.setOnClickListener {
            if (validarSenhasIguais()) {
                Toast.makeText(this, "Cadastro efetuado", Toast.LENGTH_SHORT).show()
                // Aqui entrará o código do banco de dados no futuro
            } else {
                Toast.makeText(this, "Verifique as senhas antes de continuar", Toast.LENGTH_SHORT).show()
            }
        }

    }

    private fun verificarForcaSenha(senha: String) {
        var forca = 0

        // Regras de pontuação (cada regra cumprida = 1 barra acesa)
        if (senha.length >= 8) forca++ // Regra 1: Tamanho mínimo
        if (senha.matches(".*[A-Z].*".toRegex()) && senha.matches(".*[a-z].*".toRegex())) forca++ // Regra 2: Maiúsculas e minúsculas
        if (senha.matches(".*[0-9].*".toRegex())) forca++ // Regra 3: Números
        if (senha.matches(".*[@#\$%^&+=!].*".toRegex())) forca++ // Regra 4: Caractere especial

        // Se estiver vazio, zera a força
        if (senha.isEmpty()) forca = 0

        atualizarCoresDasBarras(forca)
    }

    private fun atualizarCoresDasBarras(forca: Int) {
        val cinza = ContextCompat.getColor(this, R.color.cinza_inativo)

        // Define a cor baseada no nível atual
        val corAtual = when (forca) {
            1 -> ContextCompat.getColor(this, R.color.vermelho_fraco)
            2 -> ContextCompat.getColor(this, R.color.laranja_razoavel)
            3 -> ContextCompat.getColor(this, R.color.amarelo_bom)
            4 -> ContextCompat.getColor(this, R.color.verde_forte)
            else -> cinza
        }

        // Pinta as barras (acende com a cor atual ou apaga com cinza)
        binding.barra1.setBackgroundColor(if (forca >= 1) corAtual else cinza)
        binding.barra2.setBackgroundColor(if (forca >= 2) corAtual else cinza)
        binding.barra3.setBackgroundColor(if (forca >= 3) corAtual else cinza)
        binding.barra4.setBackgroundColor(if (forca >= 4) corAtual else cinza)

        // Atualiza o texto (Opcional)
        binding.textoForcaSenha.setTextColor(corAtual)
        binding.textoForcaSenha.text = when (forca) {
            1 -> "Senha fraca"
            2 -> "Senha razoável"
            3 -> "Senha boa"
            4 -> "Senha forte"
            else -> ""
        }
    }

    private fun validarSenhasIguais(): Boolean {
        val senha = binding.etSenha.text.toString()
        val confirmar = binding.etConfirmarSenha.text.toString()

        // Se estiver vazio, não mostra erro ainda
        if (confirmar.isEmpty()) {
            binding.layoutConfirmarSenha.error = null
            return false
        }

        return if (senha != confirmar) {
            binding.layoutConfirmarSenha.error = "As senhas não coincidem"
            false
        } else {
            binding.layoutConfirmarSenha.error = null // Remove o aviso de erro
            true
        }
    }

}
