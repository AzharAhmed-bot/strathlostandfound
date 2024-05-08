export default function handlePostFaq(question,toast,setNewQuestion) {

    // Ensure the question is not empty before submitting
    if (!question.trim()) {
      toast.error('Please enter a valid question.');
      return;
    }

    fetch('http://localhost:5000/reviews', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ review: question }),
    })
      .then((resp) => resp.json())
      .then(() => {
        toast.success('Question posted successfully! We will answer ASAP');
        setNewQuestion('');
      })
      .catch((error) => {
        console.error('Error posting question:', error);
        toast.error('An error occurred while posting the question.');
      });
  }
