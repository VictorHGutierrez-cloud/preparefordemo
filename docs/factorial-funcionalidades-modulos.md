# Factorial - Funcionalidades por Modulo e Diferencas de Plano

Arquivo gerado em: 2026-05-18

## 1) Fontes usadas

- `✅  Feature Map - Source of Truth - Internal use for Cx & Sales.xlsx`
- `ROW USD Prices.xlsx`
- Escopo focado em modulos vendidos via bundles/add-ons no pricing ROW.

## 2) Regra comercial (Bundle-first)

- Regra de ouro numero zero: **sempre vender por Bundle primeiro**.
- **Add-ons** entram apenas quando o bundle base nao cobre uma necessidade critica.
- Fluxo recomendado:
  1) escolher bundle;
  2) validar cobertura funcional;
  3) fechar gaps com add-ons (se necessario).

## 3) Bundles do ROW USD Prices

### Starter Bundles
- **Starter Planning**: Core, Time Tracking, Time Off and Shifts | Monthly B/E: $6.0/$7.5 | Yearly B/E: $5.4/$6.75 | Floor: 14.0 seats
- **Starter Productivity**: Core, Time Tracking, Time Off and Performance | Monthly B/E: $6.0/$7.5 | Yearly B/E: $5.4/$6.75 | Floor: 14.0 seats
- **Starter Essentials**: Core, Time Tracking, Time Off and Trainings | Monthly B/E: $6.0/$7.5 | Yearly B/E: $5.4/$6.75 | Floor: 14.0 seats
- **Starter Consulting**: Core, Time Tracking, Time Off and Projects | Monthly B/E: $6.0/$7.5 | Yearly B/E: $5.4/$6.75 | Floor: 14.0 seats
- **Starter People**: Core, Time Tracking, Time Off | Monthly B/E: $6.0/$7.5 | Yearly B/E: $5.4/$6.75 | Floor: 14.0 seats
- **Starter Operations**: Core, Performance, Trainings, Engagement | Monthly B/E: $6/$7.5 | Yearly B/E: $5.4/$6.75 | Floor: 14 seats

### PRO Bundles
- **Planning PRO**: Starter Planning + Trainings + Performance + Engagement | Monthly B/E: $10.5/$12.0 | Yearly B/E: $9.45/$10.8 | Floor: 14.0 seats
- **Productivity PRO**: Starter Productivity + Trainings + Engagement | Monthly B/E: $9.0/$10.5 | Yearly B/E: $8.1/$9.45 | Floor: 14.0 seats
- **Essentials PRO**: Starter Essential + Performance + Engagement | Monthly B/E: $9.0/$10.5 | Yearly B/E: $8.1/$9.45 | Floor: 14.0 seats
- **Consulting PRO**: Starter Projects + Trainings + Performance + Engagement | Monthly B/E: $10.5/$12.0 | Yearly B/E: $9.45/$10.8 | Floor: 14.0 seats

## 4) Add-ons (somente se necessario)

- Os itens abaixo devem ser tratados como complemento ao bundle, nao como ponto de partida da proposta.

- **Employee platform /Core** (Per seat): Monthly B/E: $1.5/2.5 | Yearly B/E: $1.35/2.25
- **Time-off** (Per seat): Monthly B/E: $2.2/3.2 | Yearly B/E: $1.98/2.88
- **Time Tracking** (Per seat): Monthly B/E: $2.2/3.2 | Yearly B/E: $1.98/2.88
- **Complaints channel** (Per seat): Monthly B/E: $1.0/- | Yearly B/E: $0.9/-
- **Shift Management** (Per seat): Monthly B/E: $2.5/- | Yearly B/E: $2.25/-
- **Engagement** (Per seat): Monthly B/E: $2.0/6.5 | Yearly B/E: $1.8/5.9
- **Performance 2.0** (Per seat): Monthly B/E: $2.5/4.1 | Yearly B/E: $2.25/3.7
- **Trainings** (Per seat): Monthly B/E: $2.5/- | Yearly B/E: $2.25/-
- **Recruitment (5 Active Jobs)** (Fixed): Monthly B/E: $89.0/129.0 | Yearly B/E: $80.1/116.1
- **Recruitment (10 Active Jobs)** (Fixed): Monthly B/E: $149.0/179.0 | Yearly B/E: $134.1/161.1
- **Recruitment (Unlimited)** (Fixed): Monthly B/E: $199.0/249.0 | Yearly B/E: $179.1/224.1
- **Expenses fixed** (Fixed + Per user): Monthly B/E: $39.0/89.0 | Yearly B/E: $35.1/80.1
- **Expenses extra user** (Fixed + Per user): Monthly B/E: $4.0/6.0 | Yearly B/E: $3.6/5.4
- **Accounts Payable** (Fixed): Monthly B/E: $199.0/- | Yearly B/E: $179.1/-
- **Procurement** (Fixed): Monthly B/E: $35.0/- | Yearly B/E: $31.5/-
- **Project Management** (Per seat): Monthly B/E: $2.5/3.5 | Yearly B/E: $2.25/3.15
- **Space** (Per seat): Monthly B/E: $1.0/- | Yearly B/E: $0.9/-
- **Software Management** (Per seat): Monthly B/E: $1.0/- | Yearly B/E: $0.9/-
- **It Inventory** (Per seat): Monthly B/E: $2.5/- | Yearly B/E: $2.25/-
- **Spending Management (Add on bundle)** (Fixed + Expenses extra user): Monthly B/E: $59.0/99.0 | Yearly B/E: $53.1/89.1

## 5) Funcionalidades por modulo e diferencas Business vs Enterprise

### Core
Fonte: `🧠 Core`

- Diferenca principal: **Enterprise tem funcionalidades extras** em relacao ao Business.
- Total comum (B+E): 61
- Total somente Business: 0
- Total somente Enterprise: 11
- Itens com status especial (NEW/COMING SOON/etc): 7

**Somente Enterprise**
- Generate custom reports to extract specific information
- Create SQL reports for advanced data analysis
- Set permissions for advanced reports access
- Administer custom dimensions in cost centers for enhanced data categorization
- Customize fields and tables for tailored data management
- Generate automatically documents with employee's information
- Create document templates with fillable PDFs, DOCX (Word), and variables fields that will automatically grab information from the platform
- Define and create tasks for document templates in onboarding workflows
- Define an expiration date when uploading documents
- Coffre Fort Electronique (eDoc) - For FR only
- Access an audit log and track previous actions and trace historical processes

**Comum (Business e Enterprise)**
- Access and manage information on the employee directory
- Manage employee's contracts and automate promotions, changes and updates
- Delegate the task of filling contract details such as start date, role, level, salary, contract hours, and custom fields to managers or HR admins.
- Manage and define work schedules and add multiple locations, on the employees profile, for all companies
- Define roles and set custom permissions
- Manage your profile data through mobile devices
- Upload IDs with a super task of employee data collection
- Visualize and map your company's organizational structure, with a search option, on desktop and mobile app
- Administer teams and offices
- Create groups with customized authorizations and limits in terms of permissions
- Create Communities and enhance engagement
- Post announcements or important information for your communities, on desktop
- Express appreciation with claps, reactions or comments on the posts through desktop and mobile app
- Showcase your company with a dedicated Career Page
- Organize job positions with the Job Catalog
- Get a consolidated overview of workforce costs, including agreement data, expenses, and compensation, alongside headcount and FTE metrics.
- Analyze payroll data in detail by applying up to 3 payroll concept filters
- Compare cost across periods to identify cost patterns and anomalies
- Slice and dice financial data by date range, team, data source, cost center, and more to get the exact view each stakeholder needs
- Group and visualize financial data by cost center to understand how workforce costs are distributed across the organization
- Filter any financial report by cost center to give Finance and HR managers a clear, segmented view of their area of responsibility
- Export costs data to Excel for further analysis or reporting outside the platform
- Ask ONE specific financial questions in natural language and get instant answers, from the cost of a department in a given period to the payroll breakdown of a specific employee last quarter
- Manage finance cost centers
- Create HR reports and extract actionable insights, using filters that fit your specific needs
- Navigate through financial workspaces and cost center dimensions
- Manage financial workspaces
- Access your notifications Inbox, with requests or other required actions, through desktop and mobile app
- Configure which notifications you want to receive/activate
- Create tasks and assign them to employees and/or teams
- Facilitate mobile onboarding, including tasks and information
- Delegate approvers for streamlined approval processes
- Set approval flows based on request types
- Create a custom workflow to automate tasks and actions
- Create and receive custom notifications tailored to your needs
- Gain an overview of onboarding workflows as a manager
- Launch onboarding and offboarding workflows, with a 3 step-guided process,tasks description and preview option
- Optimize OB workflows by multi-selecting the requested data and the new employee custom fields, on the same task
- Store and manage your documents in the cloud
- Sign unlimited documents with a legally valid e-signature, through desktop and mobile app
- Establish and organize document folders with personalized or public access options
- Easily find your employee documents through filters and sorting options, such as signed, status, legal entity and more
- Send, download and delete documents in bulk
- Track e-signature status for bounced emails
- Control employee's access and actions with customized permission groups and tailor the levels of access and visibility
- Manage API keys for enhanced functionality
- Enable Single Sign-On for simplified access
- Configure and define a periodic password rotation for added security
- Access certified Partners for labor, fiscal, and legal assistance
- Synchronize time and expenses data with payroll
- Navigate a guided payroll process
- Automate variables and supplements
- Sync with Factorial Ecosystem and compatible payroll software
- Collaborate effectively throughout the payroll cycle
- Manage employee updates
- Engage in live messaging with your Bookkeeper
- Gain insights into payroll and overview cost evolution
- Export employees personal information changes/updates, which impacted the payroll process of a current period
- Distribute automatically payslips using the information of the employees with a smart document reading tool
- Use Supertask Payroll fields
- Create additional compensations in bulk

**Status especiais**
- Sharing Advanced Reports (Business: NEW; Enterprise: None)
- Complete Tasks in bulk in Process Overview (Business: NEW; Enterprise: None)
- Send automated emails through a workflow and customize each one with individualized employee variables (Business: NEW; Enterprise: None)
- Send automated surveys through a workflow (Business: NEW; Enterprise: None)
- Move, change visibility and send signature reminders in bulk (Business: NEW; Enterprise: None)
- Recover deleted documents (trash bin) (Business: NEW; Enterprise: None)
- Implement secure sign-in authentication (Business: False; Enterprise: None)

### Time Tracking
Fonte: `⏰ Time Tracking`

- Diferenca principal: **Enterprise tem funcionalidades extras** em relacao ao Business.
- Total comum (B+E): 28
- Total somente Business: 0
- Total somente Enterprise: 5
- Itens com status especial (NEW/COMING SOON/etc): 3

**Somente Enterprise**
- Implement multiple time tracking policies
- Clock-in and out with a facial recognition tracking system (Deprecated in the EU due to legislative indications)
- Authorize timesheet edits with proper authorization processes (BR: Business + Enterprise)
- Receive geofencing alerts for location-based tracking
- Set time ranges and tolerances for precise tracking and easier detection of inconsistencies (BR: Business + Enterprise)

**Comum (Business e Enterprise)**
- Record and manage employee time tracking
- Clock-in and out on desktop and/or on mobile app
- Clock-in and out with unique employees ID numbers
- Clock-in and out with a QR Code scanning tracking system
- Track clock-in locations through geolocation on mobile app - without alerts and notifications
- Assign one or more locations on each employee profile,allowing flexible options when clocking-in. Choose which one is the default location
- Monitor the annualization of work time with a yearly balance
- Approval on employee timesheets for validation
- Autofill of individual timesheets for accurate record-keeping
- Filter time periods for specific tracking needs such as exports, approvals, incidencies, overtime of a certain period.
- Access a real-time attendance dashboard and allow management to easily check who missed the clock-in, who clocked-in, worklocation and breaks
- Autofill timesheets for accurate record-keeping
- Export detailed timesheets (Including foglio Presenze)
- Extra Hours in Tranches - Majoration
- Define custom rules for the tracking and compensation of overtime (extra time) and special hours (Festive, special date, night shifts)
- Track Extra hours and Special hours in all overlapping categories
- Define breaks as fixed, semiflexible or flexible
- Create paid and unpaid breaks
- Customize time periods for specific tracking needs such as exports, approvals, incidencies, overtime of a certain period.
- Track planned breaks automatically
- Make automatic corrections for manually clocked-in breaks (DE only)
- Set tolerances and roundings for planned shifts
- Configure rounding of total worked time
- Address time tracking inconsistencies like missed clock-in/outs
- Bank of Hours for employee self-balancing of extra time
- Compensate special hours (work time on special days/occasions) with Bank of Hours, Time Off accruals or Payroll (with Compensation module)
- Submit overtime requests
- Compensate overtime with Bank of Hours, Time Off accruals and Payroll (with Compensation module)

**Status especiais**
- Track complementary hours for part time employees (Business: COMING SOON; Enterprise: None)
- Set rounding of extra hours (Business: COMING SOON; Enterprise: None)
- Employees and Managers can choose how to compensate time from the Bank of Hours (Business: COMING SOON; Enterprise: None)

### Time Off
Fonte: `🌴 Time Off`

- Diferenca principal: **Enterprise tem funcionalidades extras** em relacao ao Business.
- Total comum (B+E): 35
- Total somente Business: 0
- Total somente Enterprise: 5

**Somente Enterprise**
- Implement multi-level approvals for time-off requests
- Manage and control the duration by absence type by setting a min and max duration of the absence request
- Set blocked periods and restrict time-off requests
- Use flexible cycles for dynamic planning of Time-Off
- See history of Policy Assignment

**Comum (Business e Enterprise)**
- Give autonomy to employees by allowing time-off requests, on desktop and mobile app
- Approve and get visibility of time-off requests,through desktop and mobile app
- Receive e-mail notification and in-app task to review time off request
- Edit or delete approved time off requests
- Get real-time recommendations for leave approvals based on shifts and employee balances.
- Manually adjust time off balances as needed
- Delegate a global approval for time-off
- Attach documents when submitting an absence request
- Compensate overtime with Time Off or/and Payroll
- Set the frequency for accruing time off
- Enable negative counters for Time Off Allowance
- Place a limit if negative counters are enabled
- Define carry over days between cycles
- Prorate allowances for specific scenarios
- Implement unlimited time-off policies
- Assign one or more locations on each employee profile and use the time-off policy/period of the default location
- Establish prorated tenure periods for accurate tracking
- Restrict specific leave types as needed
- Utilize French ouvres for tailored leave management
- Include or exclude bank holidays in time-off calculations
- Define specific policies for requesting time off
- Designate specific absences as paid, ensuring they're considered as worked days in the annual balance calculation
- Control whether holidays count as bank holidays, weekends, or rest days in working and natural day counters.
- Limit the number of days employees can take from future cycles to prevent payroll issues
- Connect Time off with Planning tools rest days and daily value calculation
- Track absence types with designated counters
- Implement French joint counters for customized tracking
- Export Time-Off insights and data (Including Mapa de Férias)
- Visualize Past, Upcoming and Pending time off requests for an employee
- View time in multiple calendar formats
- Set personalized rules for automatic time off request review
- Get real-time recommendations for leave approvals based on personalized rule (One)
- Provide smart context and guidance to employees when requesting time off (One)
- Automatise Time off approval based on personalized rules and approval flows
- Provide proposed further actions when approving time off with personalized rules

### Shifts
Fonte: `📅 Time Planning`

- Diferenca principal: **Enterprise tem funcionalidades extras** em relacao ao Business.
- Total comum (B+E): 25
- Total somente Business: 0
- Total somente Enterprise: 5
- Itens com status especial (NEW/COMING SOON/etc): 1

**Somente Enterprise**
- Automatic weekly scheduler using optimization
- Allow employees to add their working preferences
- Include compentences/skills requirements into automatic scheduler
- Include rotation requirements into automatic scheduler
- Plan shifts based on demand capacity or sales forecast

**Comum (Business e Enterprise)**
- Create, manage and assign shifts to your team, individually or in bulk
- Create and save templates for rotating shifts and select different colors to each week
- Create saved shifts to quickly use later
- Create shift with in bulk with copy shifts feature
- Drag and drop shifts
- Different view options
- Add, edit and approve absences during shift planning
- Add and edit breaks during shift planning
- Order employees by seniority, job position, first name, and last name
- Visualize shifts by employee or by workareas
- Review your or/and your team's shift on mobile app
- Adapt the view to your needs selecting only the relevant information for you
- Create and manage breaks in custom and rotating shifts
- Include location, workspace, and comments in shift details
- Receive warnings for conflicts in shift scheduling
- Apply advanced filters for precise shift management
- Create the distribution of shifts needed per week and workplace
- Specify the number of employees needed per shift and visually indicate its full coverage
- Copy coverage periods of Shifts
- Allow users to indicate overtime in shifts
- Export a spreadsheet of Shifts information, including breaks
- Time insights (UI report for planned hours, max legal hours, and yearly balance )
- Allow employee to swap shift with a colleague via the mobile APP (manager approval needed)
- Read and create shfits via API
- Automatically create backup shifts for approved absences overlapping planned shifts, visible only to managers

**Status especiais**
- Add workplace, worksarea, and notes in shift details (Business: False; Enterprise: False)

### Engagement
Fonte: `🧿Engagement`

- Diferenca principal: **sem diferencas estruturais claras** no arquivo (quase tudo igual entre Business e Enterprise).
- Total comum (B+E): 7
- Total somente Business: 0
- Total somente Enterprise: 0
- Itens com status especial (NEW/COMING SOON/etc): 4

**Comum (Business e Enterprise)**
- Access detailed insights from Surveys, including analytics and eNPS metrics
- Send periodical climate surveys
- Utilize the eNPS to track employee satisfaction
- Conduct insightful surveys for comprehensive employee feedback
- Foster a culture of recognition with peer-to-peer kudos sharing
- Access to Survey templates
- Send automated surveys using workflows

**Status especiais**
- Enable daily pulse check-ins to proactively track employee sentiment (Business: NEW; Enterprise: NEW)
- Track employee sentiment trends with pulse distribution reports (Business: NEW; Enterprise: NEW)
- Generate AI-powered reports on trending topics from pulse check-in comments (Business: None; Enterprise: NEW)
- Create 1:1 AI meetings to drive weekly feedback from your team (Business: None; Enterprise: NEW)

### Performance
Fonte: `✨ Performance`

- Diferenca principal: **sem diferencas estruturais claras** no arquivo (quase tudo igual entre Business e Enterprise).
- Total comum (B+E): 19
- Total somente Business: 0
- Total somente Enterprise: 0
- Itens com status especial (NEW/COMING SOON/etc): 2

**Comum (Business e Enterprise)**
- Set performance reviews and evaluate your teams
- Set customized target-groups for the performance review
- Define how the target group or individual employee will be evaluated and by who
- Define the performance review timeline
- Send automatic participation reminders for reviews
- Implement 360 Performance Reviews for holistic feedback
- Create, manage and track goals and KRs
- Create action plan and goals based on performance review agreement
- Visualize Employee Competencies with spider graphs
- Track employee competencies comprehensively
- Leverage AI for performance review summaries and goal alignment
- Access to insights, completion rate and heatmap answers for each performance review
- Enable auto-saving of answers during reviews
- Manage participants flexibility: change managers & employees even on active reviews
- Createm, sign and download Performance Review Agreements
- Calculate scores automatically for streamlined reviews
- Provide and receive instant Feedback
- Visualize performance trends with score distribution reports (Talent Analytics)
- Identify high and low performers with a 9-box grid (Talent Analytics)

**Status especiais**
- Customize section weights to the final performance score (Business: False; Enterprise: NEW)
- Assign reviewer weights in the evaluation process (Business: False; Enterprise: NEW)

### Trainings
Fonte: `🤸‍♂️ Trainings`

- Diferenca principal: modulo apresentado como **somente Business** (sem coluna Enterprise na aba).
- Total comum (B+E): 0
- Total somente Business: 13
- Total somente Enterprise: 0
- Itens com status especial (NEW/COMING SOON/etc): 5

**Somente Business**
- Access training insights and KPI Dashboard
- Track attendance of training sessions and course completion
- Receive scheduled notifications
- Control training internal documents and public materials efficiently
- Export training and participant summaries to Excel
- Link skills with training through Competencies
- Streamline training request and approval workflows
- Use Factorial helper for filling out Relatorio Unico Anex C (Portugal 🇵🇹)
- Access MyTraining in the mobile App: vailable training sessions, track progress, confirm attendance, upload certificates, view documentation, and receive notifications
- Connect training with performance reviews to assign and track development plans
- Launch training Satisfaction Surveys
- Send post-training effectiveness surveys to measure long-term impact and comply with ISO audits
- Define course validity to enable expiration alarms and stay compliant

**Status especiais**
- Automate the process of "Bonificación de Formaciones" in FUNDAE through our automatic .XML generator (Business: NEW)
- Automate the generation and distribution of FUNDAE Satisfaction Survey; certificate of attendance; and Diploma. (Business: NEW)
- Upload and distribute multimedia content to enhance employee training sessions (Business: NEW)
- Create and send knowledge tests to evaluate your teams after completing a training (Business: NEW)
- Auto-generate and manage training certificates (Business: NEW)

### Projects
Fonte: `🧰 Project Management`

- Diferenca principal: **Enterprise tem funcionalidades extras** em relacao ao Business.
- Total comum (B+E): 27
- Total somente Business: 0
- Total somente Enterprise: 1
- Itens com status especial (NEW/COMING SOON/etc): 6

**Somente Enterprise**
- Integrate projects from other tools or sources via API

**Comum (Business e Enterprise)**
- Create and manage projects, through a Project Creation Wizard, adding the project information and details step by step
- Create subprojects within main projects
- Duplicate projects and its subprojects
- Associate hours to projects and track project time
- Import Projects, Subprojects and asigned employees through an automated import solution
- Gain insights through the Projects Overview section
- Record and monitor expenses within projects
- Indicate whether a project is billable or not and distinguish external projects for the internal ones
- Elevate project depth with key specifics like start date, due date, and internal code
- Define a Project Manager/Editor with the ability to create, edit, and assign team members to projects and subprojects
- Appoint a Project Director/Owner,who has the same permissions as the Project Manager, plus exclusive access to financial data
- Set a budget calculation type and fixed project cost, along with a set number of project hours for in-depth analysis and reporting
- Activity log: record all activities performed by users in the system
- Monitor and control project's cost per employee
- Handle projects costs in diverse currencies
- Detailed View of Expenses: Track all expenses associated with your project.
- Project Costs: Monitor expenses, labor costs, and fixed costs.
- Tasks: Create tasks associated with projects and assign them to your employees. Keep track of tasks with deadlines and attached documents
- Clock in widget: desktop and mobile, Track hours in Projects directly from the ClockIn widget.
- Comments in Tasks: Reactions and share action
- Task Duplication When Duplicating Projects
- Connect My Projects with Time Off information
- Client entity: We added a new entity to Projects to group all the client's information.
- Project Planning tool: to help organize, allocate resources, detect bottlenecks.
- Kanban view
- Add documents to projects
- New subprojects entity

**Status especiais**
- Issue invoices to clients (link with CRM) [ONLY ES 🇪🇸] (Business: None; Enterprise: NEW)
- Have total projects costs: purchased invoices (Business: NEW; Enterprise: None)
- Billing system: Profitability (Business: NEW; Enterprise: None)
- Quote builder (Business: None; Enterprise: NEW)
- Task time tracking (Business: None; Enterprise: COMING SOON)
- Project Manager role of approver for Projects, Time Off, Invoices, Expenses, Time Tracking (Business: None; Enterprise: LIVE)

### Recruitment
Fonte: `🐠 Recruitment`

- Diferenca principal: **sem diferencas estruturais claras** no arquivo (quase tudo igual entre Business e Enterprise).
- Total comum (B+E): 22
- Total somente Business: 0
- Total somente Enterprise: 0
- Itens com status especial (NEW/COMING SOON/etc): 17

**Comum (Business e Enterprise)**
- Manage Applicant Tracking System (ATS)
- Create and manage ATS job requisitions
- Monitor active jobs within the ATS
- Facilitate and allow referrals within Factorial
- Control internal open positions and referrals
- Allow spontaneous applications
- Collaborate with unlimited hiring managers
- Customize hiring process phases
- Employee application forms and filters
- Apply tags to categorize candidates
- Set a DISC Personality Assessments to candidates
- Set job opening salary settings monthly/daily
- Access the latest candidate CV and/or update a new one
- Manage recruiter email inbox effectively
- Launch call or WhatsApp without adding the candidate to an application
- Set a data consent expiration date to the candidate's profile information
- Add and store notes (feedback) in Candidate Profile and display the feedback in every application
- Integrate with LinkedIn and Indeed for limited listings
- Integrate with InfoJobs and Welcome to the Jungle
- Get insights about candidate data retention
- Access important metrics such as new hiring stages funnel, open jobs, new open jobs, candidates source and gender distribution
- Access insights about time-to-hire and time-to-offer

**Status especiais**
- Import job openings and candidate data to ease your ATS migration (Business: NEW; Enterprise: None)
- Post your job offers across +250 job boards (standard and premium portals) (Business: NEW; Enterprise: None)
- Upload several CV files (in bulk) and automatically create new candidates with the CVs information (Business: None; Enterprise: True)
- Summarise and highlight applicants with AI Top Match (Business: None; Enterprise: True)
- Automate the process of sending emails when a candidate moves to a specific phase and set which phases will this email apply (Business: None; Enterprise: True)
- Implement evaluation forms (Business: None; Enterprise: True)
- Customize candidate sources and application rejection reasons (Business: None; Enterprise: True)
- Use customizable rejection templates with smart actions (Business: None; Enterprise: True)
- Automate the sending and sign of the offer letter (Business: None; Enterprise: True)
- Utilize company-wide message templates (Business: None; Enterprise: True)
- Connect your calendar to Factorial and schedule interviews with Cronofy (Business: None; Enterprise: True)
- Facilitate instant candidate calls through push notifications on the mobile app (Business: None; Enterprise: True)
- Add extra customization to the career page (Business: None; Enterprise: True)
- Streamline interview scheduling (Business: None; Enterprise: True)
- Define recruiter, hiring manager, and reviewer roles to control access in the hiring process (Business: None; Enterprise: NEW)
- Leverage AI to automatically surface top candidates from your talent pool (Business: None; Enterprise: NEW)
- Create templates for recurrent application questions (Business: None; Enterprise: NEW)

### Expenses
Fonte: `🧮 Expenses`

- Diferenca principal: **Enterprise tem funcionalidades extras** em relacao ao Business.
- Total comum (B+E): 16
- Total somente Business: 6
- Total somente Enterprise: 14
- Itens com status especial (NEW/COMING SOON/etc): 6

**Somente Enterprise**
- Reimburse expenses through payroll
- Establish and apply unlimited approval policies for expenses
- Apply auto-approval rules for expenses
- Designate multiple approvers per level
- Set and manage Factorial Cards limits (Monthly, Usage, Unlimited, Limited)
- Have acccess and manage until 5 physical cards for free
- Support multiple currencies for diverse expense needs
- Create custom subcategories for expenses
- Group your expenses for easier management
- Link Expenses Categories/Subcategories with Accounting Accounts
- Achieve AEAT/URSAFF Certification for compliance (Spain and France only)
- Digital archive compliance for conservazione sostitutiva in Italy (integration with Aruba)
- Payments with SEPA
- Accounting integration (general ledger and draft entries)

**Somente Business**
- Effortlessly set customized budgets
- Streamlined expense reporting
- Real-time alerts for budget exceedance
- Budget oversight and control
- Transparency and accountability
- Improved financial planning

**Comum (Business e Enterprise)**
- Create and submit an expense on desktop and mobile app
- Scan receipts and fill automatically the expense form with AI-powered OCR for smart document reading, on desktop and mobile app
- Include expenses seamlessly within projects
- Customize expenses forms to match your needs
- Establish only one approval policy for expenses
- Define and apply approval flows with multiple steps
- Manage monthly expenses effortlessly
- Control and create both virtual and physical Factorial Card
- Have acccess and manage until 3 physical Factorial Cards for free
- Pay with Factorial Cards, physical, virtual or on a digital wallet
- Access an overallview side section with useful data about each card such as Card details, approval & payments history, budget control, cardholder information and Card alias
- Track expenses in real-time with insightful reports
- Tailor your expense and transaction exports by selecting the spreadsheet format (CSV or XLSX), applying multiple filters, and configuring the exported columns according to your needs
- Spending dashboard showing company's expenses to track spending patterns and uncovering insights
- Persistent expense alerts to enable better oversight and faster resolution: filter by type, priority and status
- Gain insights on employee expenses and costs within the Financial Workspace (already included in Core)

**Status especiais**
- Manage Factorial Cards across multiple legal entities (Business: False; Enterprise: NEW)
- Report expenses on behalf of others efficiently (Business: False; Enterprise: NEW)
- Sign documents uploaded from the desktop for certified digitalisation (Business: NEW; Enterprise: None)
- Automatically detect potential duplicate expenses (Business: NEW; Enterprise: None)
- Per diem: Automatically calculated rates for all possible destinations + be able to input own ones (🇩🇪) (Business: COMING SOON; Enterprise: None)
- Payment Policies (Business: Business; Enterprise: None)

### Complaints channel
Fonte: `🗣️ Trust Channel`

- Diferenca principal: modulo apresentado como **somente Business** (sem coluna Enterprise na aba).
- Total comum (B+E): 0
- Total somente Business: 9
- Total somente Enterprise: 0

**Somente Business**
- Access to a customized company-branded Complaints Channel in desktop and mobile app
- Submit anonymous or identified complaints and provide detailed descriptions, attachments, and secure the complaint with a password
- Complaint submission for employees, ex employees, partners and clients
- Ensure privacy and security with encrypted information and restricted access, only available to designated complaint officers
- Allow complaint officers to review, comment, and upload documents, even for anonymous complaints
- Track complaint status and add follow-up information or documents using a unique complaint code and password
- Receive real-time notifications on the dashboard for new complaints, updates, or attachments
- View a summary of complaints with key details such as Status, creation date, due date, description, and attachments
- Comply with European Whistleblower law

### Accounts Payable
Fonte: ` 💸 Accounts Payable - 2024`

- Diferenca principal: modulo apresentado como **somente Business** (sem coluna Enterprise na aba).
- Total comum (B+E): 0
- Total somente Business: 5
- Total somente Enterprise: 0
- Itens com status especial (NEW/COMING SOON/etc): 7

**Somente Business**
- Invoice Management
- Automated Invoice digitization with OCR
- Smart bank reconciliation with AI
- Vendor Management
- Export invoices, transactions and reconciliation to Excel

**Status especiais**
- Bank Aggregation - Synchronization with Banks (Business: NEW)
- Accounting integration (Business: COMING SOON)
- Electronic invoices (Business: COMING SOON)
- Cashflow Insights (Business: COMING SOON)
- Approvals for Invoices (Business: COMING SOON)
- Payments with SEPA (Business: NEW)
- Integration with ERP's (Business: COMING SOON)

### Procurement
Fonte: `🐎 Procurement-2025`

- Diferenca principal: modulo apresentado como **somente Business** (sem coluna Enterprise na aba).
- Total comum (B+E): 0
- Total somente Business: 12
- Total somente Enterprise: 0
- Itens com status especial (NEW/COMING SOON/etc): 13

**Somente Business**
- Manage all your purchase types
- Manage all purchase orders
- Create and manage vendors seamlessly
- Export purhcase orders
- Invoice Management
- Automated Invoice digitization with OCR
- Smart bank reconciliation with AI
- Vendor Management
- Export invoices, transactions and reconciliation to Excel
- Bank Aggregation - Synchronization with Banks
- Payments with SEPA
- Download Purchase Orders as PDF

**Status especiais**
- Customise the purchase request from questions (Business: NEW)
- Purchase request workflows for approvals, tasks and document management (Business: NEW)
- Mobile inbox to approve requests (Business: NEW)
- Purchase Order configuration (Business: COMING SOON)
- Sign vendor contracts (Business: COMING SOON)
- Connect purchase requests to Cost Centres or Budgets (Business: COMING SOON)
- Purchase Orders .CSV export (Business: COMING SOON)
- Electronic invoices (Business: COMING SOON)
- Approvals for invoices (Business: COMING SOON)
- Create single-use cards linked to orders (Business: COMING SOON)
- Streamline invoice processing (Business: COMING SOON)
- Accounting integration (Business: COMING SOON)
- Integration with ERPs (Business: COMING SOON)

### Space
Fonte: `🪐Space Management`

- Diferenca principal: modulo apresentado como **somente Business** (sem coluna Enterprise na aba).
- Total comum (B+E): 0
- Total somente Business: 6
- Total somente Enterprise: 0

**Somente Business**
- Allow your employees to book a spacework, on desktop and mobile app
- Gain real-time workspace insights: Workplace, workareas, spaces to be book & its capacity
- Use a flexible booking system
- Access and manage bookings on the go
- Enable reservations for external users
- Export booking data

### Software Management
Fonte: `🖥 Software Management`

- Diferenca principal: modulo apresentado como **somente Business** (sem coluna Enterprise na aba).
- Total comum (B+E): 0
- Total somente Business: 9
- Total somente Enterprise: 0

**Somente Business**
- Receive contract renewal notifications
- Control software access for terminated users
- View insights through the Dashboard and Reports
- Streamline payment approval workflows
- Export transaction details to Excel
- Automate SaaS subscription payments with Factorial Cards
- Track which employees are actively using specific software
- Manage software efficiently to reduce costs
- Handle new licenses and associated costs

### It Inventory
Fonte: `📱 IT Inventory`

- Diferenca principal: modulo apresentado como **somente Business** (sem coluna Enterprise na aba).
- Total comum (B+E): 0
- Total somente Business: 11
- Total somente Enterprise: 0
- Itens com status especial (NEW/COMING SOON/etc): 3

**Somente Business**
- Create, edit, assign and retire devices with structured workflows
- Bulk import devices with the Guided Universal Importer (template, column mapping, validation, and error preview)
- Manage complete device profiles: type, model, serial number, specifications, purchase price, purchase and warranty dates
- Assign devices to employees and/or Spaces (meeting rooms, hot desks, etc.)
- Track the full history of each device: creation, ownership changes, status updates, edits, and stock movements
- Filter and group devices by multiple criteria (status, type, owner, model, warranty dates, etc.)
- Apply bulk actions to delete or reassign multiple devices at once
- Manage device lifecycle statuses: In stock, Assigned, Under repair, Retired, Maintenance
- Control access through permissions: delegate inventory management with the Manage IT role (no need to be superadmin)
- Integrate with Job Catalog to define role-based equipment kits
- Integrate with Onboarding to automatically suggest and assign devices during the hiring flow

**Status especiais**
- Connect REST API with devices and assignments (Business: NEW)
- Generate standardized handover documents directly from Inventory for each employee (Business: NEW)
- Export inventory data in CSV/XLSX formats for reporting and audits (Business: NEW)

## 6) Observacoes

- `Shifts` foi mapeado para a aba `📅 Time Planning`.
- `Projects` foi mapeado para `🧰 Project Management`.
- `Accounts Payable` foi mapeado para ` 💸 Accounts Payable - 2024`; `Procurement` para `🐎 Procurement-2025`.
- Em modulos sem coluna Enterprise, a comparacao de diferencas fica limitada ao que existe na planilha.
