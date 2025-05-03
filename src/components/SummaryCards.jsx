import { Card, CardContent, Typography, Grid } from '@mui/material'

const SummaryCards = ({ tasks }) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'Done').length
  const pendingTasks = totalTasks - completedTasks

  const cardData = [
    { title: 'Total Tasks', value: totalTasks, color: 'primary.main' },
    { title: 'Completed Tasks', value: completedTasks, color: 'success.main' },
    { title: 'Pending Tasks', value: pendingTasks, color: 'warning.main' }
  ]

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card sx={{ backgroundColor: card.color, color: 'white' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {card.title}
              </Typography>
              <Typography variant="h4" component="div">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default SummaryCards