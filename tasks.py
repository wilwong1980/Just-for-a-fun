from queue import Queue


class SystemCall(object):
    def handle(self):
        pass


class GetTid(SystemCall):
    def handle(self):
        self.task.sendval = self.task.tid
        self.sched.schedule(self.task)


class Task(object):
    task_id = 0

    def __init__(self, target):
        Task.task_id += 1
        self.tid = Task.task_id
        self.target = target
        self.sendval = None

    def run(self):
        return self.target.send(self.sendval)


class NewTask(SystemCall):
    def __init__(self, target):
        self.target = target

    def handle(self):
        tid = self.sched.new(self.target)
        self.task.sendval = tid
        self.sched.schedule(self.task)


class KillTask(SystemCall):
    def __init__(self,tid):
        self.tid = tid

    def handle(self):
        task = self.sched.taskmap.get(self.tid,None)
        if task:
            task.target.close()
            self.task.sendval = True
        else:
            self.task.sendval = False
        self.sched.schedule(self.task)


class Scheduler(object):
    def __init__(self):
        self.ready = Queue()
        self.taskmap = {}

    def new(self, target):
        newtask = Task(target)
        self.taskmap[newtask.tid] = newtask
        self.schedule(newtask)
        return newtask.tid

    def schedule(self, task):
        self.ready.put(task)

    def exit(self, task):
        print('Task %d terminated' %task.tid)
        del self.taskmap[task.tid]

    def mainloop(self):
        while self.taskmap:
            task = self.ready.get()
            try:
                result = task.run()
                if isinstance(result, SystemCall):
                    result.task = task
                    result.sched = self
                    result.handle()
                    continue
            except StopIteration:
                self.exit(task)
                continue
            self.schedule(task)



# def foo():
#     print("Part 1")
#     yield
#     print("Part 2")
#     yield
#
# t1 = Task(foo())
# t1.run()
# t1.run()

def foo():
    mytid = yield GetTid()
    for i in range(10):
        print('I am Foo', mytid)
        yield

def bar():
    mytid = yield GetTid()
    for i in range(5):
        print('I am Bar', mytid)
        yield


sched = Scheduler()
sched.new(foo())
sched.new(bar())
sched.mainloop()