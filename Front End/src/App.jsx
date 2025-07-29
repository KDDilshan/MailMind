import React, { useState } from 'react'
import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

const App = () => {

  const[emailContent, setEmailContent] =useState('') 
  const[tone, setTone] = useState('');
  const[generatedReply, setGeneratedReply] = useState('');
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {

      const response=await axios.post("http://localhost:8096/api/email/generateEmail", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));

    }catch (err) {
      setError('Failed to generate reply. Please try again.');
      console.error(err);
    }finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant="h4" component="h1"gutterBottom>
        Email Reply Generator
      </Typography>

    
      <Box sx={{mx: 3}}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb: 2}}
          placeholder="Paste your email content here..."
        />


        <FormControl fullWidth sx={{mb: 2}}>
          <InputLabel id="tone-label">Tone(Optional)</InputLabel>
          <Select
            labelId="tone-label"
            value={tone || ''}
            onChange={(e) => setTone(e.target.value)}
            label="Tone (Optional)"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>


        {error && <Typography color="error" sx={{mt: 2}}>{error}</Typography>}

        {generatedReply && (
          <Box sx={{mt: 3, p: 2, border: '1px solid #ccc', borderRadius: '4px'}}>
            <Typography variant="h6" gutterBottom>
              Generated Reply:
              </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={generatedReply|| ''}
              InputProps={{
                readOnly: true,
              }}
              />
          </Box>

        )}

        <Button 
          variant="outlined"
          sx={{mt: 2}}
          onClick={() => navigator.clipboard.writeText(generatedReply)}>
          Copy Reply to Clipboard
          </Button>


      </Box>
    </Container>
  );
}

export default App
