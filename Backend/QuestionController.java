package net.guides.springboot2.springboot2jpacrudexample.controller;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.guides.springboot2.springboot2jpacrudexample.exception.ResourceNotFoundException;
import net.guides.springboot2.springboot2jpacrudexample.model.Question;
import net.guides.springboot2.springboot2jpacrudexample.repository.QuestionRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class QuestionController {
	@Autowired
	private QuestionRepository questionRepository;

	@GetMapping("/questions")
	public List<Question> getAllQuestions() {
		return questionRepository.findAll();
	}

	@GetMapping("/questions/{id}")
	public ResponseEntity<Question> getQuestionById(@PathVariable(value = "id") Long questionId)
			throws ResourceNotFoundException {
		Question question = questionRepository.findById(questionId)
				.orElseThrow(() -> new ResourceNotFoundException("Question not found for this id :: " + questionId));
		return ResponseEntity.ok().body(question);
	}

	@PostMapping("/questions")
	public Question createQuestion(@Valid @RequestBody Question question) {
		return questionRepository.save(question);
	}

	@PutMapping("/questions/{id}")
	public ResponseEntity<Question> updateQuestion(@PathVariable(value = "id") Long questionId,
			@Valid @RequestBody Question questionDetails) throws ResourceNotFoundException {
		Question question = questionRepository.findById(questionId)
				.orElseThrow(() -> new ResourceNotFoundException("Question not found for this id :: " + questionId));

		/*
		 * question.setEmailId(questionDetails.);
		 * question.setLastName(questionDetails.getLastName());
		 * question.setFirstName(questionDetails.getFirstName());
		 */
		question.setOption_A(questionDetails.getOption_A());
		question.setOption_B(questionDetails.getOption_B());
		question.setOption_C(questionDetails.getOption_C());
		question.setOption_D(questionDetails.getOption_D());
		question.setSelected_Opt(questionDetails.getSelected_Opt());
		final Question updatedQuestion = questionRepository.save(question);
		return ResponseEntity.ok(updatedQuestion);
	}

	@DeleteMapping("/questions/{id}")
	public Map<String, Boolean> deleteQuestion(@PathVariable(value = "id") Long questionId)
			throws ResourceNotFoundException {
		Question question = questionRepository.findById(questionId)
				.orElseThrow(() -> new ResourceNotFoundException("Question not found for this id :: " + questionId));

		questionRepository.delete(question);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
